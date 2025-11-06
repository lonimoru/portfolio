import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Award, Users, Clock, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const skills = [
  "Adobe Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "AI Tools",
  "Motion Graphics",
  "Color Grading",
  "Audio Editing",
  "Visual Effects"
];

// Achievements updated based on Nikita’s Yandex profile
const achievements = [
  {
    icon: Award,
    title: "Рейтинг 5.0",
    description: "80+ отзывов"
  },
  {
    icon: Users,
    title: "200+ заказов",
    description: "Выполненные проекты"
  },
  {
    icon: Clock,
    title: "5+ лет опыта",
    description: "В видеомонтаже с января 2020 года"
  },
  {
    icon: Star,
    title: "Индивидуальный подход",
    description: "Каждый проект - уникален"
  }
];

export function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Image and highlights */}
          <div className="space-y-8">
            <div className="relative">
              <ImageWithFallback
                src="/avatar.png"
                alt="Video Editor Portrait"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm">лет опыта</div>
              </div>
            </div>

            {/* Achievement cards */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4">
                      <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right column - About content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Обо&nbsp;мне
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                {/* Updated biography to reflect Nikita’s background */}
                <p>
                  Приветствую! Меня зовут Никита, я видеомонтажёр с опытом более пяти лет и я готов выполнить задачи любой сложности быстро и качественно.
                </p>
                <p>
                  Я окончил Волгоградский государственный технический университет и работаю 
                  удаленно по всей России, проживая в Волгограде. На платформе Яндекс Услуги 
                  реализовал десятки проектов для клиентов и получил рейтинг 5.0 на основе 80+ отзывов.
                </p>
                <p>
                  Я убеждён, что грамотный монтаж усиливает историю и эмоции, создавая цельный и естественный 
                  видеоряд. Каждая склейка, переход и эффект подбираются, чтобы подчеркнуть замысел и сделать 
                  просмотр незабываемым.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Навыки и&nbsp;компетенции
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="px-3 py-1 text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-600">
              <h4 className="font-bold text-gray-900 mb-2">Моя философия</h4>
              <p className="text-gray-600 italic">
                «Каждый кадр рассказывает историю. Моя задача — найти идеальный ритм,
                темп и эмоциональный поток, который оживит эту историю самым
                выразительным способом».
              </p>
            </div>

            {/* Process */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Процесс работы
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Начальный этап</h5>
                    <p className="text-gray-600 text-sm">Обсуждаем вашу задачу, цели и целевую аудиторию</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Разработка истории</h5>
                    <p className="text-gray-600 text-sm">Создаю структуру и делаю первые наброски</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Производство и&nbsp;финал</h5>
                    <p className="text-gray-600 text-sm">Монтаж, цветокоррекция, звук и финальная выдача</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}