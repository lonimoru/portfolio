import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { VideoItem } from "../data/videos";
import { longVideos, shortsVideos } from "../data/videos";
import type { ProjectRatio } from "../lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { SectionHeading } from "./SectionHeading";
import { StaggerGroup } from "./Reveal";

type HomepageProject = {
  video: VideoItem;
  ratio: ProjectRatio;
};

const homepageProjectOrder: { url: string; ratio: ProjectRatio }[] = [
  { url: "https://youtu.be/n3rUELxETK0", ratio: "16:9" },
  { url: "https://youtu.be/rUzdTVaqBU0", ratio: "16:9" },
  { url: "https://youtu.be/5WPjoD-h-sI", ratio: "16:9" },
  { url: "https://youtu.be/geFuYlVRazU", ratio: "16:9" },
  { url: "https://youtube.com/shorts/BUm70HfCbPo?si=8nHYklaHpu5CxA9E", ratio: "9:16" },
  { url: "https://youtu.be/zGbYBkSNT54", ratio: "16:9" },
];

const homepageProjects: HomepageProject[] = homepageProjectOrder.map(({ url, ratio }) => {
  const collection = ratio === "9:16" ? shortsVideos : longVideos;
  const video = collection.find((item) => item.url === url);

  if (!video) {
    throw new Error(`Homepage project is missing from the portfolio data: ${url}`);
  }

  return { video, ratio };
});

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<HomepageProject | null>(null);
  const featuredShowreels = homepageProjects.slice(0, 2);
  const supportingProjects = homepageProjects.slice(2);

  return (
    <section id="portfolio" className="section-shell bg-[#f6f7f9]">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Избранные работы"
            title="Портфолио без лишних слов"
            description="Шоурилы, реклама, вертикальные форматы, motion и AI-видео."
          />
          <Link
            to="/projects"
            className="secondary-button focus-ring self-start border-slate-300 text-slate-900 lg:self-auto"
          >
            Все проекты
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2">
          {featuredShowreels.map((project) => (
            <ProjectCard
              key={project.video.url}
              video={project.video}
              ratio={project.ratio}
              badge="Showreel"
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </StaggerGroup>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {supportingProjects.map((project) => (
            <ProjectCard
              key={project.video.url}
              video={project.video}
              ratio={project.ratio}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </StaggerGroup>

        <div className="mt-12 flex justify-center">
          <Link
            to="/projects"
            className="secondary-button focus-ring border-slate-300 bg-white text-slate-900 hover:bg-slate-950 hover:text-white"
          >
            Перейти в полный архив
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ProjectModal
        project={selectedProject?.video ?? null}
        ratio={selectedProject?.ratio ?? "16:9"}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
