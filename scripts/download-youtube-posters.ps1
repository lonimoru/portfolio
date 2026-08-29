[CmdletBinding()]
param(
  [string]$VideosFile,
  [string]$OutputDirectory
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $VideosFile) {
  $VideosFile = Join-Path $scriptDirectory "..\src\data\videos.ts"
}
if (-not $OutputDirectory) {
  $OutputDirectory = Join-Path $scriptDirectory "..\public\posters"
}

function Get-YouTubeVideoId {
  param([Parameter(Mandatory = $true)][string]$Url)

  try {
    $uri = [System.Uri]$Url
    $hostName = $uri.DnsSafeHost.ToLowerInvariant()

    if ($hostName -eq "youtu.be" -or $hostName.EndsWith(".youtu.be")) {
      $candidate = ($uri.AbsolutePath.Trim("/") -split "/")[0]
      if ($candidate -match "^[A-Za-z0-9_-]{11}$") {
        return $candidate
      }
    }

    if ($hostName -eq "youtube.com" -or $hostName.EndsWith(".youtube.com")) {
      if ($uri.AbsolutePath -match "^/(?:shorts|embed)/([A-Za-z0-9_-]{11})(?:/|$)") {
        return $Matches[1]
      }

      if ($uri.AbsolutePath -eq "/watch" -and $uri.Query -match "(?:^|[?&])v=([A-Za-z0-9_-]{11})(?:&|$)") {
        return $Matches[1]
      }
    }
  }
  catch {
    return $null
  }

  return $null
}

$ytDlp = Get-Command "yt-dlp" -ErrorAction SilentlyContinue
if (-not $ytDlp) {
  $wingetLink = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Links\yt-dlp.exe"
  if (Test-Path -LiteralPath $wingetLink) {
    $ytDlp = Get-Item -LiteralPath $wingetLink
  }
}

if (-not $ytDlp) {
  $wingetPackages = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages"
  $ytDlp = Get-ChildItem -LiteralPath $wingetPackages -Recurse -Filter "yt-dlp.exe" -File -ErrorAction SilentlyContinue |
    Select-Object -First 1
}

if (-not $ytDlp) {
  throw "yt-dlp was not found. Install it with: winget install yt-dlp"
}

$ytDlpExecutable = if ($ytDlp -is [System.Management.Automation.CommandInfo]) {
  $ytDlp.Source
}
else {
  $ytDlp.FullName
}

$deno = Get-Command "deno" -ErrorAction SilentlyContinue
if (-not $deno) {
  $wingetPackages = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages"
  $deno = Get-ChildItem -LiteralPath $wingetPackages -Recurse -Filter "deno.exe" -File -ErrorAction SilentlyContinue |
    Select-Object -First 1
}

$denoExecutable = if ($deno -is [System.Management.Automation.CommandInfo]) {
  $deno.Source
}
elseif ($deno) {
  $deno.FullName
}
else {
  $null
}

$resolvedVideosFile = [System.IO.Path]::GetFullPath($VideosFile)
$resolvedOutputDirectory = [System.IO.Path]::GetFullPath($OutputDirectory)

if (-not (Test-Path -LiteralPath $resolvedVideosFile)) {
  throw "Project data file not found: $resolvedVideosFile"
}

New-Item -ItemType Directory -Path $resolvedOutputDirectory -Force | Out-Null

$source = Get-Content -Raw -Encoding UTF8 -LiteralPath $resolvedVideosFile
$urlPattern = 'https?://(?:(?:www|m)\.)?(?:youtube\.com|youtu\.be)/[^"''\s,}]+'
$urls = @()

foreach ($match in [regex]::Matches($source, $urlPattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
  if ($urls -notcontains $match.Value) {
    $urls += $match.Value
  }
}

$created = @()
$skipped = @()
$failures = @()

Write-Host "Found $($urls.Count) unique YouTube URL(s) in $resolvedVideosFile."

foreach ($url in $urls) {
  $videoId = Get-YouTubeVideoId -Url $url
  if (-not $videoId) {
    $failures += [pscustomobject]@{
      Url = $url
      Reason = "Unsupported or invalid YouTube URL"
    }
    Write-Warning "Could not parse a YouTube video ID: $url"
    continue
  }

  $posterPath = Join-Path $resolvedOutputDirectory "$videoId.webp"
  if (Test-Path -LiteralPath $posterPath) {
    $skipped += $videoId
    Write-Host "SKIP    $videoId (poster already exists)"
    continue
  }

  Write-Host "FETCH   $videoId"
  $outputTemplate = Join-Path $resolvedOutputDirectory "%(id)s.%(ext)s"
  $ytDlpArguments = @(
    "--skip-download",
    "--write-thumbnail",
    "--convert-thumbnails", "webp",
    "--no-playlist",
    "--no-overwrites",
    "--no-progress",
    "--output", $outputTemplate
  )
  if ($denoExecutable) {
    $ytDlpArguments += @("--js-runtimes", "deno:$denoExecutable")
  }
  $ytDlpArguments += @("--", $url)

  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    $ytDlpOutput = @(& $ytDlpExecutable @ytDlpArguments 2>&1)
    $exitCode = $LASTEXITCODE
  }
  finally {
    $ErrorActionPreference = $previousErrorActionPreference
  }

  if ($exitCode -eq 0 -and (Test-Path -LiteralPath $posterPath)) {
    $created += $videoId
    Write-Host "CREATED $posterPath"
    continue
  }

  $details = ($ytDlpOutput | Select-Object -Last 8) -join [Environment]::NewLine
  if (-not $details) {
    $details = "yt-dlp exited with code $exitCode and did not create the expected poster"
  }

  $failures += [pscustomobject]@{
    Url = $url
    Reason = $details
  }
  Write-Warning "FAILED  $videoId ($url)"
}

Write-Host ""
Write-Host "Thumbnail summary"
Write-Host "-----------------"
Write-Host "URLs found: $($urls.Count)"
Write-Host "Created:    $($created.Count)"
Write-Host "Skipped:    $($skipped.Count)"
Write-Host "Failed:     $($failures.Count)"

if ($created.Count -gt 0) {
  Write-Host "Created poster IDs: $($created -join ', ')"
}

if ($failures.Count -gt 0) {
  Write-Host ""
  Write-Host "Failures"
  Write-Host "--------"
  foreach ($failure in $failures) {
    Write-Host $failure.Url
    Write-Host $failure.Reason
    Write-Host ""
  }
  exit 1
}

exit 0
