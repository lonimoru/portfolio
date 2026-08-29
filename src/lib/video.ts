export function toYouTubeId(input = ""): string {
  try {
    const value = input.trim();
    const match = value.match(
      /(?:v=|\/shorts\/|youtu\.be\/|\/embed\/)([A-Za-z0-9_-]{11})/,
    );

    if (match?.[1]) return match[1];

    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (url.hostname.includes("youtube.com") && url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/shorts/")[1]?.split(/[?&]/)[0] ?? "";
    }

    if (url.hostname.includes("youtube.com")) {
      return url.searchParams.get("v") ?? "";
    }
  } catch {
    return "";
  }

  return "";
}

export function getYouTubeThumbnail(input = ""): string {
  const id = toYouTubeId(input);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

export function getLocalYouTubePoster(input = ""): string {
  const id = toYouTubeId(input);
  return id ? `/posters/${id}.webp` : "";
}

type ProjectPosterInput = {
  url: string;
  posterUrl?: string;
  externalVideoUrl?: string;
};

export function getProjectPosterUrls(video: ProjectPosterInput): string[] {
  const sourceUrl = video.externalVideoUrl ?? video.url;

  return Array.from(
    new Set(
      [
        video.posterUrl,
        getLocalYouTubePoster(sourceUrl),
        getYouTubeThumbnail(sourceUrl),
      ].filter((value): value is string => Boolean(value)),
    ),
  );
}
