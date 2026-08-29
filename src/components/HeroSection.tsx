import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Play, Star } from "lucide-react";
import { heroLineVariants, MOTION_EASE, staggerVariants } from "../lib/motion";

const HERO_MEDIA = {
  mp4: "/hero-loop.mp4",
  poster: "/hero-poster.webp",
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#0b1220] pt-24 text-white sm:min-h-[820px]"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        {!reduceMotion && !videoFailed ? (
          <motion.video
            className="h-full w-full object-cover object-center"
            src={HERO_MEDIA.mp4}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_MEDIA.poster}
            onError={() => setVideoFailed(true)}
            initial={{ scale: 1 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 14, ease: "linear" }}
          />
        ) : (
          <motion.img
            src={HERO_MEDIA.poster}
            alt=""
            className="h-full w-full object-cover object-center"
            initial={reduceMotion ? false : { scale: 1 }}
            animate={reduceMotion ? undefined : { scale: 1.03 }}
            transition={{ duration: 14, ease: "linear" }}
          />
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,10,19,.97)_0%,rgba(5,10,19,.86)_45%,rgba(5,10,19,.44)_75%,rgba(5,10,19,.66)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,18,32,.15)_0%,rgba(11,18,32,.08)_68%,#0b1220_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="site-container py-20 sm:py-28">
        <motion.div
          variants={staggerVariants}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, filter: "blur(8px)", y: 8 },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration: 0.8, ease: MOTION_EASE },
              },
            }}
            className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-blue-300 sm:text-[15px]"
          >
            Видеомонтаж · постпродакшн · motion
          </motion.p>

          <motion.h1
            variants={staggerVariants}
            className="max-w-[12ch] text-[clamp(3.2rem,7.4vw,7.2rem)] font-[780] leading-[0.91] tracking-[-0.065em]"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" variants={heroLineVariants}>
                Качественный
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block text-blue-400" variants={heroLineVariants}>
                видеомонтаж
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={heroLineVariants}
            className="mt-8 max-w-2xl text-[clamp(1.05rem,1.7vw,1.32rem)] leading-relaxed text-slate-200"
          >
            С 2020 года создаю рекламные ролики, YouTube-видео, Shorts и motion-графику —
            от исходников до готового видео под задачу клиента. AI-инструменты использую там,
            где они действительно усиливают результат.
          </motion.p>

          <motion.div
            variants={heroLineVariants}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={scrollToPortfolio}
              className="primary-button focus-ring"
            >
              <Play className="h-4 w-4 fill-current" />
              Смотреть работы
            </button>
            <a href="#contact" className="secondary-button focus-ring text-white">
              Обсудить проект
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            variants={heroLineVariants}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-7 gap-y-6 border-t border-white/15 pt-7 sm:grid-cols-3"
          >
            <div>
              <strong className="block text-2xl font-bold">200+</strong>
              <span className="mt-1 block text-sm text-slate-400">выполненных заказов</span>
            </div>
            <a
              href="https://uslugi.yandex.ru/profile/NikitaR-303813"
              target="_blank"
              rel="noreferrer"
              className="focus-ring group rounded-lg"
            >
              <strong className="flex items-center gap-2 text-2xl font-bold group-hover:text-blue-300">
                5.0 <Star className="h-4 w-4 fill-current" />
              </strong>
              <span className="mt-1 block text-sm text-slate-400">80+ отзывов</span>
            </a>
            <div>
              <strong className="block text-2xl font-bold">6 лет</strong>
              <span className="mt-1 block text-sm text-slate-400">практики с 2020 года</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToPortfolio}
        className="focus-ring absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 sm:flex"
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Перейти к портфолио"
      >
        Работы
        <ArrowDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}
