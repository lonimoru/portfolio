import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import type { VideoItem } from "../data/videos";
import type { ProjectRatio } from "../lib/projects";
import { getProjectTags } from "../lib/projects";
import { getProjectPosterUrls } from "../lib/video";
import { revealVariants } from "../lib/motion";

type Props = {
  video: VideoItem;
  ratio: ProjectRatio;
  onOpen: () => void;
  featured?: boolean;
  badge?: string;
};

export function ProjectCard({ video, ratio, onOpen, featured = false, badge }: Props) {
  const reduceMotion = useReducedMotion();
  const posterUrls = getProjectPosterUrls(video);
  const [posterIndex, setPosterIndex] = useState(0);
  const thumbnail = posterUrls[posterIndex] ?? "";
  const tags = getProjectTags(video, ratio);

  return (
    <motion.article
      layout={!reduceMotion}
      variants={revealVariants}
      className={`project-card group ${featured ? "lg:col-span-2" : ""}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="project-card__media focus-ring"
        aria-label={`Открыть проект: ${video.title}`}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className="project-card__image"
            onError={() => setPosterIndex((current) => current + 1)}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}
        <span className="project-card__scrim" />
        {badge && <span className="project-card__badge">{badge}</span>}
        <span className="project-card__play" aria-hidden="true">
          <Play className="h-5 w-5 fill-current" />
        </span>
      </button>

      <div className="px-1 pt-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="focus-ring flex w-full items-start justify-between gap-4 rounded-lg text-left"
        >
          <span>
            <span className="block text-[1.05rem] font-semibold leading-snug text-slate-950 transition-colors group-hover:text-blue-700">
              {video.title}
            </span>
            {video.subtitle && (
              <span className="mt-1.5 block text-sm leading-relaxed text-slate-500">
                {video.subtitle}
              </span>
            )}
          </span>
          <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
        </button>
      </div>
    </motion.article>
  );
}
