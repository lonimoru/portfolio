import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clapperboard,
  Heart,
  Megaphone,
  MonitorPlay,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react";
import { revealVariants } from "../lib/motion";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Service = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  price: string;
  popular?: boolean;
};

const services: Service[] = [
  {
    icon: Clapperboard,
    title: "Классический монтаж роликов",
    description: "Праздничные, корпоративные и вертикальные видео для Reels и Shorts.",
    features: ["Нарезка и сборка", "Титры и графика", "Музыка", "Цветокоррекция"],
    price: "от 1 000 ₽",
    popular: true,
  },
  {
    icon: Megaphone,
    title: "Реклама и презентационные видео",
    description: "Продающие и информационные ролики для бизнеса, мероприятий и проектов.",
    features: ["Сценарий и концепция", "Инфографика", "Озвучка", "Адаптация под аудиторию"],
    price: "от 2 000 ₽",
  },
  {
    icon: Heart,
    title: "Свадебные и событийные видео",
    description: "Монтаж церемоний, банкетов и важных моментов без потери живых эмоций.",
    features: ["Хайлайт-ролик", "Полная церемония", "Монтаж банкета", "Архив важных сцен"],
    price: "от 5 000 ₽",
  },
  {
    icon: Wand2,
    title: "Постпродакшн",
    description: "Финальная обработка изображения и звука, чтобы ролик выглядел цельно.",
    features: ["Цветокоррекция", "Чистка шумов", "Улучшение качества", "Обработка звука"],
    price: "от 1 000 ₽",
  },
  {
    icon: MonitorPlay,
    title: "Ролики из фотографий",
    description: "Динамичные слайд-шоу из ваших фотографий с переходами и музыкой.",
    features: ["Анимация фото", "Переходы", "Подбор музыки"],
    price: "от 1 500 ₽",
  },
  {
    icon: Palette,
    title: "Интро и анимация логотипа",
    description: "Фирменные заставки и motion-графика для видео и каналов.",
    features: ["Дизайн интро", "Анимация логотипа", "Выбор стиля"],
    price: "от 1 500 ₽",
  },
];

const addOns = [
  ["Срочный монтаж до 24 часов", "+50–100% к стоимости"],
  ["Дополнительные правки", "около 500 ₽ каждая"],
  ["Улучшение качества / апскейл короткого видео", "от 500 ₽"],
  ["Адаптация ролика под другой формат", "от 500 ₽"],
];

const additionalCapabilities = [
  "AI-генерация видео и изображений",
  "Анимация изображений и недостающие сцены",
  "Обложки, превью и визуальные концепции",
  "AI-озвучка и подготовка голоса",
  "Сценарий, структура и раскадровка ролика",
  "Простые лендинги, Telegram-боты и AI-прототипы",
];

function scrollToContact() {
  if (window.location.pathname === "/") {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = "/#contact";
  }
}
export function ServicesSection() {
  return (
    <section id="services" className="section-shell bg-[#eef1f5]">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Услуги"
            title="От исходников до готового ролика"
            description="Основное направление — видеомонтаж и постпродакшн. Точная стоимость зависит от продолжительности, исходных материалов и сложности задачи."
          />
          <button type="button" onClick={scrollToContact} className="primary-button focus-ring self-start lg:self-auto">
            Рассчитать проект
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={revealVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.24 }}
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-soft ${
                  service.popular ? "border-blue-300" : "border-slate-200"
                }`}
              >
                {service.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    Частый запрос
                  </span>
                )}
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="max-w-[20ch] text-xl font-bold leading-tight text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{service.description}</p>
                <ul className="mt-5 grid gap-2 text-sm text-slate-600">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
                  <strong className="text-lg text-slate-950">{service.price}</strong>
                  <button type="button" onClick={scrollToContact} className="focus-ring rounded-lg text-sm font-bold text-blue-700 hover:text-blue-900">
                    Заказать
                  </button>
                </div>
              </motion.article>
            );
          })}
        </StaggerGroup>

        <Reveal className="tech-panel relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#101827] p-6 text-white shadow-soft sm:p-8">
          <div className="tech-network pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div className="max-w-xl">
              <p className="section-kicker text-blue-300">Дополнительные возможности</p>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Современные инструменты — в поддержку основной задачи
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Дополнительно работаю с генеративными инструментами и AI-прототипированием: создаю недостающий визуал, озвучку и концепции, а также могу собрать простой лендинг, сайт-портфолио или базового Telegram-бота. Эти возможности дополняют основную работу с видео и обсуждаются отдельно в зависимости от задачи.
              </p>
            </div>
            <Sparkles className="hidden h-8 w-8 text-blue-300 lg:block" />
          </div>
          <StaggerGroup className="relative z-10 mt-7 grid gap-x-8 gap-y-1 md:grid-cols-2">
            {additionalCapabilities.map((item) => (
              <StaggerItem key={item} className="flex items-start gap-3 border-t border-white/10 py-4 text-[15px] font-semibold leading-relaxed text-slate-200">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                {item}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
          <Reveal className="rounded-2xl bg-[#111827] p-6 text-white sm:p-8">
            <h3 className="text-2xl font-bold">Дополнительные услуги</h3>
            <div className="mt-5 divide-y divide-white/10">
              {addOns.map(([name, price]) => (
                <div key={name} className="flex flex-col justify-between gap-1 py-3 text-sm sm:flex-row sm:gap-4">
                  <span className="text-slate-300">{name}</span>
                  <strong className="text-white">{price}</strong>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-slate-950">Как проходит работа</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                ["01", "Обсуждение задачи", "Обсуждаем цель, формат, референсы, объём работы и желаемый результат."],
                ["02", "Материалы и согласование", "Вы отправляете исходники через облако, почту или мессенджер. После этого фиксируем сроки, стоимость и основные детали."],
                ["03", "Монтаж и правки", "Собираю ролик, добавляю цвет, звук и графику, затем вношу согласованные изменения."],
                ["04", "Передача", "Экспортирую финальные версии под нужные площадки и передаю готовые файлы."],
              ].map(([step, title, description]) => (
                <div key={step} className="border-t border-slate-200 pt-4">
                  <span className="text-xs font-bold text-blue-700">{step}</span>
                  <h4 className="mt-1 font-bold text-slate-950">{title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
