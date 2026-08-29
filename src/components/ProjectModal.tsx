import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { VideoItem } from "../data/videos";
import type { ProjectRatio } from "../lib/projects";
import { getProjectTags } from "../lib/projects";
import { getProjectPosterUrls } from "../lib/video";
import { MOTION_EASE } from "../lib/motion";
import { VideoEmbed } from "./VideoEmbed";

type Props = {
  project: VideoItem | null;
  ratio: ProjectRatio;
  onClose: () => void;
};

export function ProjectModal({ project, ratio, onClose }: Props) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const posterUrl = project ? getProjectPosterUrls(project)[0] : undefined;

  useEffect(() => {
    if (!project) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/88 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: MOTION_EASE }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-300">
                Просмотр проекта
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white hover:text-slate-950"
                aria-label="Закрыть проект"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-4 sm:p-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
              <VideoEmbed
                url={project.url}
                externalVideoUrl={project.externalVideoUrl}
                directVideoUrl={project.directVideoUrl}
                directVideoWebmUrl={project.directVideoWebmUrl}
                posterUrl={posterUrl}
                title={project.title}
                ratio={ratio}
              />

              <div className="self-center">
                <div className="mb-4 flex flex-wrap gap-2">
                  {getProjectTags(project, ratio).map((tag) => (
                    <span key={tag} className="project-tag project-tag--dark">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 id={titleId} className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="mt-4 text-base leading-relaxed text-slate-300">
                    {project.subtitle}
                  </p>
                )}
                <a
                  href={project.externalVideoUrl ?? project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-slate-950"
                >
                  Открыть исходную ссылку
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
