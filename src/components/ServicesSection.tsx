// src/components/ServicesSection.tsx
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Clapperboard,
  Megaphone,
  Heart,
  Wand2,
  MonitorPlay,
  Palette,
  Check,
  ArrowRight,
} from "lucide-react";

type Service = {
  icon: React.ComponentType<{ className?: string }>;
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
    description:
      "Праздничные, корпоративные, для соцсетей (Reels, Shorts) и т.д.",
    features: [
      "Быстрая нарезка и склейка",
      "Титры и простая графика",
      "Подбор музыки",
      "Цветокоррекция",
    ],
    price: "от 1 000 ₽",
    popular: true,
  },
  {
    icon: Megaphone,
    title: "Рекламные и презентационные",
    description:
      "Продающие и презентационные видео для бизнеса, мероприятий и проектов.",
    features: [
      "Сценарий и концепция",
      "Инфографика / слайд-дизайн",
      "Озвучка (по запросу)",
      "Оптимизация под ЦА",
    ],
    price: "от 3 000 ₽",
  },
  {
    icon: Heart,
    title: "Свадебные и событийные",
    description:
      "Монтаж церемоний, банкетов и, в целом, самых важных моментов.",
    features: ["Хайлайт-ролик", "Полная церемония", "Монтаж банкета", "Сохранение важных моментов"],
    price: "от 15 000 ₽",
  },
  {
    icon: Wand2,
    title: "Постпродакшн",
    description:
      "Финальная обработка: улучшаю картинку и звук, довожу ролик до «идеала».",
    features: ["Цветокоррекция", "Чистка шумов, улучшение качества", "Звуковая обработка"],
    price: "от 1 500 ₽",
  },
  {
    icon: MonitorPlay,
    title: "Ролики из фотографий",
    description:
      "Динамичные слайд-шоу из ваших фото с переходами и музыкой.",
    features: ["Анимация фото", "Красивые переходы", "Подбор музыки"],
    price: "от 2 000 ₽",
  },
  {
    icon: Palette,
    title: "Интро и анимация логотипа",
    description:
      "Фирменные заставки и эффектная анимация логотипа для ваших видео.",
    features: ["Дизайн интро", "Анимация логотипа", "Выбор стиля"],
    price: "от 1 000 ₽",
  },
];

const addOns = [
  { name: "Срочный монтаж(до 24 ч)", price: "от 50% до 100% к цене" },
  { name: "Дополнительные правки", price: "~500 ₽ каждая" },
  { name: "Улучшения качества видео(ИИ)", price: "1000 ₽" },
  { name: "Экспорт в несколько форматов", price: "500 ₽" },
];

function scrollToContact() {
  // если на главной — мягкий скролл; если нет — перейдём на /#contact
  if (location.pathname === "/") {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  } else {
    location.href = "/#contact";
  }
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Услуги и пакеты
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Комплексный видеомонтаж под ваши задачи — от идеи до готового ролика.
          </p>
        </div>

        {/* Карточки услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Card
                key={i}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  s.popular ? "border-blue-500 shadow-lg" : "hover:scale-[1.02]"
                }`}
              >
                {s.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      Самое популярное
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm text-gray-700">
                        <Check className="w-4 h-4 text-blue-600 mr-2" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t pt-4">
                    <div className="text-2xl font-bold text-gray-900 mb-4">{s.price}</div>
                    <Button
                      onClick={scrollToContact}
                      className={`w-full ${
                        s.popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                    >
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Доп. услуги */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Дополнительные услуги
            </h3>
            <p className="text-gray-600">
              Усильте проект с помощью опциональных дополнений
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {addOns.map((a, i) => (
              <div
                key={i}
                className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{a.name}</h4>
                <p className="text-blue-600 font-bold">{a.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h4 className="text-xl font-bold mb-2">Нужен индивидуальный проект?</h4>
            <p className="mb-4 opacity-90">
              Обсудим требования и соберём решение под ключ.
            </p>
            <Button
              variant="secondary"
              onClick={scrollToContact}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Обсудить проект
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Процесс */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Как это работает</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Заявка", desc: "Обсуждаем задачу и требования" },
              { step: "2", title: "Согласование", desc: "Определяем сроки и уточняем детали" },
              { step: "3", title: "Монтаж", desc: "Монтаж, цвет, звук, графика" },
              { step: "4", title: "Отправка", desc: "Передаю готовый ролик" },
            ].map((it) => (
              <div key={it.step} className="relative">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {it.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{it.title}</h4>
                <p className="text-gray-600 text-sm">{it.desc}</p>
                {it.step !== "4" && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 translate-x-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
