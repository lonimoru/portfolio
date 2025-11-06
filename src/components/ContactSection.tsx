import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Play,
  Images,
  GraduationCap,
  PercentCircle,
  ExternalLink,
} from "lucide-react";

/** endpoint Formspree */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeolbeaj";

/** карточки справа */
const CONTACT_CARDS = [
  {
    icon: Mail,
    title: "Профиль Яндекс",
    text: "Написать сообщение",
    href: "https://uslugi.yandex.ru/profile/NikitaR-303813",
  },
  { icon: Phone, title: "Телефон", text: "По запросу", href: "tel:+7XXXXXXXXXX" },
  { icon: MapPin, title: "География", text: "Москва, Санкт-Петербург, Волгоград" },
  { icon: Clock, title: "Время связи", text: "с 10:00 до 22:00" },
];

const SOCIAL_CARDS = [
  { icon: Play, title: "Showreel 2021", text: "01:21", href: "https://youtu.be/..." },
  { icon: Images, title: "Портфолио", text: "Примеры работ", href: "/projects" },
  { icon: GraduationCap, title: "Образование", text: "ВолгГТУ", href: "#" },
  { icon: PercentCircle, title: "Скидка 10%", text: "Постоянным клиентам", href: "#" },
];

const PROJECT_TYPES = [
  "Рекламный ролик",
  "Ролик для соцсетей",
  "Свадебное видео",
  "Презентация/инфографика",
  "Интро/анимация логотипа",
  "Другое",
];

export function ContactSection() {
  const [status, setStatus] =
    useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [projectType, setProjectType] = useState<string>("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!projectType) {
      setErrorMsg("Выберите тип проекта.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // доп.тех. поля
    data.append("_subject", "Новая заявка с сайта");
    data.append("page", window.location.href);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("ok");
      form.reset();
      setProjectType("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Не удалось отправить форму. Попробуйте ещё раз или напишите напрямую."
      );
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0f1623] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Давайте создавать вместе
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Готовы воплотить вашу идею в жизнь? Напишите — обсудим задачу,
            сроки и бюджет.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Форма */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    placeholder="Имя *"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                  <Input
                    name="lastName"
                    placeholder="Фамилия"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email *"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                  <Input
                    name="phone"
                    placeholder="Телефон"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                </div>

                <div className="mt-4">
                  {/* скрытый input, чтобы значение ушло в Formspree */}
                  <input type="hidden" name="type" value={projectType} />
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Выберите тип проекта *" />
                    </SelectTrigger>

                    {/* фикс прозрачности дропдауна */}
                    <SelectContent className="bg-[#1b2433] text-white border border-white/20 rounded-md shadow-lg">
                      {PROJECT_TYPES.map((t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          className="cursor-pointer data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4">
                  <Textarea
                    name="message"
                    placeholder="Расскажите о задаче: цель, длительность, пожелания по стилю, сроки и бюджет *"
                    required
                    className="min-h-[140px] bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === "sending" || !projectType}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
                >
                  {status === "sending" ? "Отправляю…" : "Отправить сообщение"}
                </Button>

                {status === "ok" && (
                  <div className="mt-4 flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    Сообщение отправлено! Я свяжусь с вами в ближайшее время.
                  </div>
                )}
                {(status === "error" || errorMsg) && (
                  <div className="mt-4 text-red-400">{errorMsg}</div>
                )}

                <p className="mt-3 text-xs text-white/50">
                  Нажимая «Отправить сообщение», вы принимаете политику
                  обработки персональных данных.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Правая колонка */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {CONTACT_CARDS.map((c) => {
                const Icon = c.icon as typeof Mail;
                return (
                  <a
                    key={c.title}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-lg bg-white/10">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">{c.title}</div>
                        <div className="mt-1 font-semibold inline-flex items-center gap-1">
                          {c.text}
                          {c.href && <ExternalLink className="w-4 h-4 opacity-70" />}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {SOCIAL_CARDS.map((c) => {
                const Icon = c.icon as typeof Play;
                return (
                  <a
                    key={c.title}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-lg bg-white/10">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">{c.title}</div>
                        <div className="mt-1 font-semibold inline-flex items-center gap-1">
                          {c.text}
                          {c.href && <ExternalLink className="w-4 h-4 opacity-70" />}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="rounded-xl p-6 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="text-center">
                <div className="text-lg font-bold">Принимаю заказы</div>
                <div className="text-white/90 mt-1">
                  Сейчас принимаю новые проекты. Бронируйте время заранее!
                </div>
                <div className="mt-3 text-sm opacity-90">
                  🟢 Свободен для новых проектов
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-white/50">
              Обычно отвечаю в течение дня • Консультации бесплатны • Давайте
              сделаем что-то крутое
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
