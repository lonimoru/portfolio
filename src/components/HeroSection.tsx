// src/components/HeroSection.tsx
import { Button } from "./ui/button";
import { ChevronDown, Play, ArrowRight, Star } from "lucide-react";

export function HeroSection() {
  const scrollToPortfolio = () =>
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Качественный{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            видеомонтаж
          </span>
        </h1>

        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          5+ лет опыта (с 2020). Профессионально и быстро создаю ролики любой сложности под ваши задачи.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <Button onClick={scrollToPortfolio} className="bg-blue-600 hover:bg-blue-700">
            <Play className="mr-2 h-4 w-4" /> Смотреть портфолио
          </Button>
          <a href="#contact" className="inline-flex items-center px-4 py-2 rounded-md border border-white/20 hover:bg-white/10">
            Сотрудничать <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto text-left">
          <div>
            <div className="text-2xl font-bold">200+</div>
            <div className="text-sm text-white/70">выполненных заказов</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              5.0 <Star className="h-5 w-5 fill-current" />
            </div>
            <div className="text-sm text-white/70">рейтинг (80+ отзывов)</div>
          </div>
          <div>
            <div className="text-2xl font-bold">5+</div>
            <div className="text-sm text-white/70">лет опыта, с 2020</div>
          </div>
        </div>

        <button
          onClick={scrollToPortfolio}
          className="mt-12 inline-flex items-center text-white/70 hover:text-white"
          aria-label="К портфолио"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
