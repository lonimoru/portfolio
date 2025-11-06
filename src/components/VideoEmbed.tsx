// src/components/VideoEmbed.tsx
import { useState } from "react";

export type Ratio = "16:9" | "9:16";

export function toYouTubeId(input: string): string {
  try {
    const str = input.trim();

    // 1) быстрый регекс: вытягиваем 11-символьный ID из watch?v=, youtu.be/, /shorts/
    const m = str.match(
      /(?:v=|\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    if (m && m[1]) return m[1];

    // 2) запасной путь — полноценный разбор URL
    const url = new URL(str);

    // https://youtu.be/ID
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    // https://www.youtube.com/shorts/ID
    if (url.hostname.includes("youtube.com") && url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/shorts/")[1]?.split("?")[0]?.split("&")[0] || "";
    }

    // https://www.youtube.com/watch?v=ID
    if (url.hostname.includes("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v && v.length === 11) return v;
    }
  } catch {
    // ignore
  }
  return "";
}

type Props = {
  id: string;          // YouTube id
  title: string;       // твой заголовок (мы показываем его СНИЗУ, а не внутри плеера)
  ratio?: Ratio;       // "16:9" | "9:16"
  privacy?: boolean;   // youtube-nocookie
};

export function VideoEmbed({ id, title, ratio = "16:9", privacy = true }: Props) {
  const [play, setPlay] = useState(false);

  const iframeSrc =
    `https://www.youtube${privacy ? "-nocookie" : ""}.com/embed/${id}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&color=white`;

  // Обложка (без текста и аватарки ютуба)
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const padding = ratio === "9:16" ? "177.78%" : "56.25%";

  return (
    <div className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-black shadow-md"
        style={{ paddingBottom: padding }}
      >
        {play ? (
          <iframe
            className="absolute left-0 top-0 h-full w-full"
            src={iframeSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Смотреть: ${title}`}
          >
            <img
              src={thumb}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg group-hover:scale-105 transition">
                {/* Иконка play */}
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </button>
        )}
      </div>
      {/* Заголовок показываем уже СВОИМ текстом */}
      {/* (оставь как у тебя в карточках/страницах) */}
    </div>
  );
}
