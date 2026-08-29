import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { VideoItem } from "../data/videos";
import { longVideos, shortsVideos } from "../data/videos";
import type { ProjectCategory, ProjectRatio } from "../lib/projects";
import { getProjectCategories, PROJECT_CATEGORIES } from "../lib/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { StaggerGroup } from "../components/Reveal";

type ProjectRecord = {
  video: VideoItem;
  ratio: ProjectRatio;
};

type FilterKey = "all" | "long" | "shorts" | ProjectCategory;

const allProjects: ProjectRecord[] = [
  ...longVideos.map((video) => ({ video, ratio: "16:9" as const })),
  ...shortsVideos.map((video) => ({ video, ratio: "9:16" as const })),
];

export default function Projects() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);

  const filterOptions = useMemo(() => {
    const base: { key: FilterKey; label: string; count: number }[] = [
      { key: "all", label: "Все", count: allProjects.length },
      { key: "long", label: "Горизонтальные", count: longVideos.length },
      { key: "shorts", label: "Вертикальные", count: shortsVideos.length },
    ];

    const categoryOptions = PROJECT_CATEGORIES.map((category) => ({
      key: category as FilterKey,
      label: category,
      count: allProjects.filter(({ video }) => getProjectCategories(video).includes(category)).length,
    })).filter((option) => option.count > 0);

    return [...base, ...categoryOptions];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return allProjects;
    if (filter === "long") return allProjects.filter(({ ratio }) => ratio === "16:9");
    if (filter === "shorts") return allProjects.filter(({ ratio }) => ratio === "9:16");
    return allProjects.filter(({ video }) => getProjectCategories(video).includes(filter));
  }, [filter]);

  return (
    <main id="main-content" className="min-h-screen bg-[#f6f7f9]">
      <header className="relative overflow-hidden bg-[#0b1220] pb-16 pt-32 text-white sm:pb-20 sm:pt-36">
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]" />
        <motion.div
          className="site-container relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="focus-ring mb-8 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="section-kicker text-blue-300">Полный архив</p>
              <h1 className="max-w-[12ch] text-[clamp(3rem,7vw,6.5rem)] font-[780] leading-[0.94] tracking-[-0.06em]">
                Проекты
              </h1>
            </div>
            <p className="max-w-xl text-[clamp(1rem,1.5vw,1.16rem)] leading-relaxed text-slate-300">
              Рекламные проекты, YouTube-видео, вертикальные ролики, motion и AI-видео. Выберите направление или откройте любую работу.
            </p>
          </div>
        </motion.div>
      </header>

      <section className="section-shell pt-10 sm:pt-12" aria-labelledby="projects-grid-title">
        <div className="site-container">
          <h2 id="projects-grid-title" className="sr-only">Список проектов</h2>
          <div className="hide-scrollbar -mx-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0" aria-label="Фильтры проектов">
            <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
              {filterOptions.map((option) => {
                const active = filter === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setFilter(option.key)}
                    className={`focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition ${
                      active
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                    }`}
                    aria-pressed={active}
                  >
                    {option.label}
                    <span className={`text-xs ${active ? "text-slate-300" : "text-slate-400"}`}>
                      {option.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5 text-sm text-slate-500">
            <p>
              Показано: <strong className="text-slate-900">{filteredProjects.length}</strong>
            </p>
          </div>

          <StaggerGroup
            key={filter}
            amount={0.01}
            className="mt-9 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.video.url}
                video={project.video}
                ratio={project.ratio}
                badge={filter === "all" && index < 2 ? "Избранное" : undefined}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </StaggerGroup>
        </div>
      </section>

      <ProjectModal
        project={selectedProject?.video ?? null}
        ratio={selectedProject?.ratio ?? "16:9"}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
