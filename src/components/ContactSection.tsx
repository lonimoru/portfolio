import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Images, Mail, Phone } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeolbeaj";

const contactLinks = [
  {
    icon: Mail,
    label: "Яндекс Услуги",
    value: "Написать в профиль",
    href: "https://uslugi.yandex.ru/profile/NikitaR-303813",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 937 705-68-59",
    href: "tel:+79377056859",
  },
  {
    icon: Images,
    label: "Все проекты",
    value: "Открыть архив",
    href: "/projects",
    internal: true,
  },
];

const projectTypes = [
  "Рекламный ролик",
  "Ролик для соцсетей",
  "YouTube-видео",
  "Поздравительное или семейное видео",
  "Свадебное или событийное видео",
  "Ролик из фотографий / слайд-шоу",
  "Презентация / инфографика",
  "Интро / анимация логотипа",
  "AI-видео / визуалы",
  "Другое",
];

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("_subject", "Новая заявка с сайта");
    data.append("page", window.location.href);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Не получилось отправить сообщение. Попробуйте ещё раз или свяжитесь через Яндекс Услуги.");
    }
  };

  return (
    <section id="contact" className="section-shell bg-[#0b1220] text-white">
      <div className="site-container">
        <SectionHeading
          eyebrow="Контакты"
          title="Давайте обсудим ваш ролик"
          description="Расскажите о задаче, исходниках и желаемом результате. Я отвечу и предложу понятный следующий шаг."
          inverted
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-16">
          <Reveal>
            <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-300">
                  Имя
                  <input name="name" required autoComplete="given-name" className="field-control" placeholder="Ваше имя" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-300">
                  Фамилия
                  <input name="surname" autoComplete="family-name" className="field-control" placeholder="Фамилия" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-300">
                  Email
                  <input name="email" type="email" required autoComplete="email" className="field-control" placeholder="name@example.ru" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-300">
                  Телефон
                  <input name="phone" type="tel" autoComplete="tel" className="field-control" placeholder="+7 900 000-00-00" />
                </label>
              </div>

              <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-300">
                Тип проекта
                <select name="type" required defaultValue="" className="field-control">
                  <option value="" disabled className="text-slate-900">Выберите тип проекта</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="text-slate-900">{type}</option>
                  ))}
                </select>
              </label>

              <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-300">
                О задаче
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="field-control resize-y"
                  placeholder="Цель, длительность, пожелания по стилю, сроки и ориентир по бюджету"
                />
              </label>

              <button type="submit" disabled={status === "sending"} className="primary-button focus-ring mt-6 w-full disabled:cursor-wait disabled:opacity-65">
                {status === "sending" ? "Отправляю…" : "Отправить сообщение"}
                <ArrowUpRight className="h-4 w-4" />
              </button>

              {status === "ok" && (
                <p className="mt-4 flex items-start gap-2 text-sm text-emerald-300" role="status">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  Сообщение отправлено. Я свяжусь с вами в ближайшее время.
                </p>
              )}
              {status === "error" && <p className="mt-4 text-sm text-red-300" role="alert">{errorMessage}</p>}

              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Нажимая «Отправить сообщение», вы соглашаетесь на обработку переданных данных для ответа на заявку.
              </p>
            </form>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-base leading-relaxed text-slate-300">
                Удобнее написать напрямую? Выберите подходящий способ связи или откройте полный архив работ.
              </p>
            </Reveal>
            <StaggerGroup className="mt-6 grid gap-3">
              {contactLinks.map(({ icon: Icon, label, value, href, internal }) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
                      <span className="mt-1 block text-base font-semibold text-white">{value}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </>
                );

                return (
                  <StaggerItem key={label}>
                    {internal ? (
                      <Link to={href} className="focus-ring group flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition hover:border-white/25 hover:bg-white/[0.055]">
                        {content}
                      </Link>
                    ) : (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="focus-ring group flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition hover:border-white/25 hover:bg-white/[0.055]">
                        {content}
                      </a>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
