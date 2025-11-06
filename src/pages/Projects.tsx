import { useEffect, useMemo, useState } from "react";
import { longVideos, shortsVideos } from "../data/videos";
import { toYouTubeId, VideoEmbed } from "../components/VideoEmbed";

type Ratio = "16:9" | "9:16";

// как выглядят записи в data/videos.ts
type RawVideo = {
  url: string;
  title: string;
  desc?: string;           // <- можешь использовать любое из трёх
  subtitle?: string;
  description?: string;
};

type UiVideo = RawVideo & {
  id: string;
  ratio: Ratio;
  meta: string;            // нормализованное описание
};

function normalize(list: RawVideo[], ratio: Ratio): UiVideo[] {
  return list.map((v) => ({
    ...v,
    id: toYouTubeId(v.url) ?? "",
    ratio,
    meta: v.desc ?? v.subtitle ?? v.description ?? "",
  }));
}

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [tab, setTab] = useState<"all" | "long" | "shorts">("all");

  const list = useMemo(() => {
    if (tab === "long") return normalize(longVideos as RawVideo[], "16:9");
    if (tab === "shorts") return normalize(shortsVideos as RawVideo[], "9:16");
    return [
      ...normalize(longVideos as RawVideo[], "16:9"),
      ...normalize(shortsVideos as RawVideo[], "9:16"),
    ];
  }, [tab]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 min-h-screen">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Проекты</h1>
        <div className="flex gap-2 rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setTab("all")}
            className={`rounded-lg px-3 py-1 text-sm ${tab === "all" ? "bg-white shadow" : "opacity-70 hover:opacity-100"}`}
          >
            Все
          </button>
          <button
            onClick={() => setTab("long")}
            className={`rounded-lg px-3 py-1 text-sm ${tab === "long" ? "bg-white shadow" : "opacity-70 hover:opacity-100"}`}
          >
            Горизонтальные
          </button>
          <button
            onClick={() => setTab("shorts")}
            className={`rounded-lg px-3 py-1 text-sm ${tab === "shorts" ? "bg-white shadow" : "opacity-70 hover:opacity-100"}`}
          >
            Вертикальные
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v, i) => (
          <div key={`${v.id}-${i}`} className="group">
            <VideoEmbed id={v.id} title={v.title} ratio={v.ratio} />
            <p className="mt-2 text-sm font-medium text-gray-900">{v.title}</p>
            {v.meta && <p className="text-sm text-gray-500">{v.meta}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
