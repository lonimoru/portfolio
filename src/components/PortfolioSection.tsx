// src/components/PortfolioSection.tsx
import { Link } from "react-router-dom";
import { VideoEmbed } from "./VideoEmbed";

const featured = [
  { url: "https://youtu.be/e1HMTzkBDR0", title: "ГРОМ.КО — Akatsuki Drums (промо)", subtitle: "Концертный промо-роли. 2025", ratio: "16:9" as const },
  { url: "https://youtu.be/n8lYENa718c", title: "Дудл-видео (doodle video)", subtitle: "Объясняющее видео", ratio: "16:9" as const },
  { url: "https://youtu.be/06jxSi6jtik", title: "Бьюти-ролик", subtitle: "Нарезка/коллаж", ratio: "16:9" as const },
  { url: "https://youtu.be/zGbYBkSNT54", title: "3D анимация логотипа — CISM", subtitle: "", ratio: "16:9" as const },
  { url: "https://youtu.be/t8KCWUoMhck", title: "Подборка видео с нейросетями", subtitle: "демо возможностей", ratio: "16:9" as const },
  { url: "https://youtu.be/5WPjoD-h-sI", title: "Ролик для курса Imagine B", subtitle: "анонс/промо", ratio: "16:9" as const },
];

function toId(u: string) {
  try {
    const url = new URL(u);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v") || "";
  } catch {}
  return "";
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl font-extrabold">Портфолио</h2>
        <p className="mt-2 text-center text-muted-foreground">
          Выборка моих проектов. Больше — на странице «Проекты».
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => {
            const id = toId(v.url);
            return (
              <div key={i} className="w-full">
                {/* БЕЗ дополнительной внешней обёртки — VideoEmbed уже рисует аспект-контейнер */}
                <VideoEmbed id={id} title={v.title} ratio={v.ratio} />

                <p className="mt-3 text-sm font-medium text-gray-900">{v.title}</p>
                {v.subtitle && (
                  <div className="text-sm text-muted-foreground">{v.subtitle}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Смотреть больше проектров
          </Link>
        </div>
      </div>
    </section>
  );
}
