import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { toYouTubeId } from "../lib/video";

export type Ratio = "16:9" | "9:16";

type Props = {
  id?: string;
  url?: string;
  title: string;
  ratio?: Ratio;
  privacy?: boolean;
  directVideoUrl?: string;
  directVideoWebmUrl?: string;
  posterUrl?: string;
  externalVideoUrl?: string;
  autoPlay?: boolean;
};

export function VideoEmbed({
  id,
  url,
  title,
  ratio = "16:9",
  privacy = true,
  directVideoUrl,
  directVideoWebmUrl,
  posterUrl,
  externalVideoUrl,
  autoPlay = true,
}: Props) {
  const fallbackUrl = externalVideoUrl ?? url ?? "";
  const [failedDirectVideoUrl, setFailedDirectVideoUrl] = useState<string | null>(null);
  const directVideoFailed = Boolean(
    directVideoUrl && failedDirectVideoUrl === directVideoUrl,
  );
  const youtubeId = id ?? toYouTubeId(fallbackUrl);
  const iframeSrc =
    `https://www.youtube${privacy ? "-nocookie" : ""}.com/embed/${youtubeId}` +
    `?autoplay=${autoPlay ? "1" : "0"}&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&color=white`;
  const aspectRatio = ratio === "9:16" ? "9 / 16" : "16 / 9";

  return (
    <div
      className={`relative mx-auto w-full overflow-hidden rounded-2xl bg-black ${
        ratio === "9:16" ? "max-w-[420px]" : ""
      }`}
      style={{ aspectRatio }}
    >
      {directVideoUrl && !directVideoFailed ? (
        <video
          key={directVideoUrl}
          className="h-full w-full object-contain"
          controls
          playsInline
          preload="metadata"
          poster={posterUrl}
          onError={() => setFailedDirectVideoUrl(directVideoUrl)}
        >
          {directVideoWebmUrl && <source src={directVideoWebmUrl} type="video/webm" />}
          <source src={directVideoUrl} type="video/mp4" />
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
      ) : directVideoFailed ? (
        <div
          className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center text-white"
          role="status"
        >
          <p className="max-w-sm text-sm leading-relaxed text-slate-300">
            Не удалось загрузить видео с прямого источника.
          </p>
          {fallbackUrl && (
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-semibold transition hover:bg-white hover:text-slate-950"
            >
              Открыть внешнее видео
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      ) : youtubeId ? (
          <iframe
            className="h-full w-full"
            src={iframeSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="eager"
          />
      ) : fallbackUrl ? (
        <div className="flex h-full items-center justify-center p-8 text-center text-white">
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/25 px-5 py-3 font-semibold transition hover:bg-white hover:text-slate-950"
          >
            Открыть видео
          </a>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-slate-400">
          Видео пока недоступно
        </div>
      )}
    </div>
  );
}
