import { Award, Clock3, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const skills = [
  "Adobe Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Motion Graphics",
  "Color Grading",
  "Audio Editing",
  "Visual Effects",
  "AI Tools",
];

const facts = [
  { icon: Award, value: "200+", label: "выполненных заказов" },
  { icon: Star, value: "5.0", label: "рейтинг по 80+ отзывам" },
  { icon: Clock3, value: "6 лет", label: "практики с 2020 года" },
];

function FactsRow({ className = "" }: { className?: string }) {
  return (
    <StaggerGroup
      className={`about-stats-row overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] ${className}`}
    >
      {facts.map(({ icon: Icon, value, label }) => (
        <StaggerItem key={label} className="p-4">
          <Icon className="mb-3 h-4 w-4 text-blue-300" />
          <strong className="block text-lg font-bold text-white">{value}</strong>
          <span className="mt-1 block text-xs leading-snug text-slate-400">{label}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-shell relative overflow-hidden bg-[#111827] text-white">
      <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" aria-hidden="true" />
      <div className="site-container relative grid gap-12 lg:grid-cols-[minmax(340px,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-20">
        <div className="mx-auto w-full max-w-[570px] lg:mx-0">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/25">
              <ImageWithFallback
                src="/diploma.webp"
                alt="Портрет видеомонтажёра Никиты Резепова"
                className="aspect-square w-full object-cover"
              />
            </div>
          </Reveal>
          <FactsRow className="mt-4 hidden grid-cols-3 lg:grid" />
        </div>

        <div>
          <SectionHeading eyebrow="Обо мне" title="Монтаж, который работает на историю" inverted />
          <StaggerGroup className="mt-8 space-y-5 text-[clamp(1rem,1.35vw,1.14rem)] leading-relaxed text-slate-300">
            <StaggerItem>
              <p>
                Меня зовут Никита. Я занимаюсь видеомонтажом с 2020 года и собираю ролики разной сложности — от короткого промо до длинного YouTube-формата.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                Работаю удалённо по всей России. На Яндекс Услугах выполнил более 200 заказов и получил рейтинг 5.0 на основе 80+ отзывов.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                В основе моей работы — ритм, понятная история, аккуратный звук и визуальная цельность. AI-инструменты использую как дополнение к монтажу: для создания недостающих сцен, анимации изображений, разработки визуальных концепций и ускорения отдельных этапов работы.
              </p>
            </StaggerItem>
          </StaggerGroup>

          <FactsRow className="mt-9 grid grid-cols-1 sm:grid-cols-3 lg:hidden" />

          <Reveal className="mt-9">
            <h3 className="text-lg font-bold text-white">Инструменты и компетенции</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-sm font-semibold text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
