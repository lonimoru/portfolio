import type { ProjectCategory } from "../lib/projects";

export type VideoItem = {
  url: string;
  title: string;
  subtitle?: string;
  isShort?: boolean;
  categories?: ProjectCategory[];
  directVideoUrl?: string;
  directVideoWebmUrl?: string;
  posterUrl?: string;
  externalVideoUrl?: string;
};

export const longVideos: VideoItem[] = [
 {
  url: "https://youtu.be/n3rUELxETK0",
  title: "Шоурил по видеомонтажу",
  subtitle: "Подборка монтажных, рекламных и творческих работ.",
  categories: ["Showreel", "Видеомонтаж", "Motion / анимация", "Творческие проекты"],

  directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/showreal2021finFin.mp4",
},
  {
  url: "https://youtu.be/rUzdTVaqBU0",
  title: "AI Showreel 2026",
  subtitle: "AI-видео, анимация изображений и генеративные визуалы.",
  categories: ["Showreel", "AI-видео", "Motion / анимация", "Творческие проекты"],

  directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/AIshow.mp4",
  posterUrl: "/hero-poster.webp",
},
  { url: "https://youtu.be/e1HMTzkBDR0", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%91%D0%B0%D1%80%D0%B0%D0%B1%D0%B0%D0%BD%D1%8B.mp4", title: "ГРОМ.KO — Akatsuki Drums (промо)", subtitle: "Концертный промо-ролик" },
  { url: "https://youtu.be/n8lYENa718c", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/21day%20(%D0%B4%D1%83%D0%B4%D0%BB%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE).mp4", title: "Дудл-видео (doodle video)", subtitle: "Озвучка с помощью нейросети" },
  { url: "https://youtu.be/06jxSi6jtik", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/reelsF1111.mp4", title: "Бьюти-ролик", categories: ["Монтаж"] },
  { url: "https://youtu.be/zGbYBkSNT54", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/ElbrusFf.mp4", title: "3D-анимация логотипа — CISM" },
  { url: "https://youtu.be/ZX494YH2Jpw", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%91%D0%94testf5_1_prob4.mp4", title: "Приключения Бони и Джека", subtitle: "Мультфильм, созданный с помощью ИИ-инструментов" },
  { url: "https://youtu.be/5WPjoD-h-sI", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%A0%D0%BE%D0%BB%D0%B8%D0%BA%20%D0%B4%D0%BB%D1%8F%20%D0%BA%D1%83%D1%80%D1%81%D0%B0%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%20%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D0%B9.mp4", title: "Ролик для курса Imagine B", subtitle: "Видео для бизнес-курса" },
  // …остальные (можно постепенно дополнять subtitle где нужно)


// — Остальные длинные (горизонтальные) видео

  { url: "https://youtu.be/RctOuZDoRoE", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%91%D0%BE%D0%B9%20%D0%BD%D0%B0%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BD%D0%B0%D1%85_1.mp4", title: "ГРОМ.КО — AI и живая съёмка" },
  { url: "https://youtu.be/ykdX3lvP7JQ", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%B2%D0%B8%D0%BB%D0%BB%D0%B0%20%D0%B2%20%D0%9C%D0%B5%D0%B4%D0%B8%D0%BD%D0%B5Newf11.mp4", title: "Вилла в Медине", subtitle: "Рекламный ролик недвижимости" },
  { url: "https://youtu.be/rqVoWXKTRvA", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%93%D1%80%D1%83%D0%BF%D0%BF%D0%B0%20%D0%A2%D0%9E2.mp4", title: "Заставка для группы ТО2" },
  { url: "https://youtu.be/0yhNlKWiBLM", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/C0039_2.mp4", title: "MAXFit‑LUX — магнитно‑волновой массаж (обзор/демо)" },
  { url: "https://youtu.be/mpgd4V0EPVM?si=vmyChZKQoHH6j2pQ", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/A%26M1ff.mp4", title: "Экскурсионный тур: Алтай и Монголия (промо)" },
  { url: "https://youtu.be/t8KCWUoMhck", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%BD%D0%B5%D0%B9%D1%80%D0%BE%D1%81%D0%B5%D1%82%D0%B82024.mp4", title: "Подборка видео с нейросетями", subtitle: "2024" },
  { url: "https://www.youtube.com/watch?v=--jFRdI6VKc", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%A4%D0%95%D0%9D%D0%98%D0%9A%D0%A1_%D0%A0%D0%95%D0%93%D0%98%D0%9D%D0%90F.mp4",  title: "Графика для ролика (кроме интро)" },
  { url: "https://youtu.be/geFuYlVRazU", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/Mechanism%20of%20actionF.mp4",  title: "MAXFit Magic Chair — рекламный ролик" },
  { url: "https://youtu.be/WK9IxFiSx4M", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/LagerFin.mp4",  title: "Реклама детского лагеря" },
  { url: "https://youtu.be/KA6YeQOFRo4", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/Final%20Intro.mp4", title: "Интро — канал «Жёлтый Камыш»" },
  { url: "https://youtu.be/6jLE4o2EI_w", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/Intro%20LogoRusFighter.mp4", title: "Анимация лого — «Боец на ринге»" },
  { url: "https://youtu.be/YvehMG95G4Q", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%B4%D0%B0%D1%80%D0%BA_fffff.mp4", title: "Трейлер игры", subtitle: "AI-анимация изображений и монтаж" },
  { url: "https://youtu.be/JAGVFBPbL3k?si=6M2kamoJT3E-1sfZ", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9.mp4", title: "Видео для игрового канала" },
  { url: "https://youtu.be/8eCtJfvN3Jo", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%98%D0%9D%D0%9A.mp4", title: "Новогодняя анимация лого — ИНК" },
  { url: "https://youtu.be/DXoAVuMoqHc", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D0%A1%D0%BB%D0%B0%D0%B9%D0%B4%D1%88%D0%BE%D1%83.mp4", title: "Пример слайдшоу", categories: ["Motion / анимация", "Монтаж"] },
  { url: "https://youtu.be/NSOj2vyoF_s", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%90%D0%BD%D0%B8%D0%BC%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BA%D0%B0%D1%80%D1%82%D1%8B.mp4", title: "Анимация карты с движением" },
  { url: "https://youtu.be/Nss4Qq0OhqE", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%AF%D1%85%D1%82%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5%20%D1%82%D1%83%D1%80%D1%8B.mp4", title: "Реклама яхтенных туров" },
  { url: "https://youtu.be/uknwS-KmvA8", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%91%D0%B5%D1%85_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9_%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%87_fin2.mp4", title: "Субтитры для интервью" },
];

// — Shorts (вертикальные 9:16)
export const shortsVideos: VideoItem[] = [
  { url: "https://youtube.com/shorts/k8Adud3Agn8?feature=share", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%9A%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%82%3B%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9.mp4", title: "Визуализация недвижимости", subtitle: "Концепт-ролик" },
  { url: "https://youtube.com/shorts/BUm70HfCbPo?si=8nHYklaHpu5CxA9E", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/7.mp4", title: "Shorts для канала режиссёра", isShort: true },
  { url: "https://youtube.com/shorts/w-AeMxw1kGw", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/Kak%20projit.mp4", title: "Shorts — «как проживать эмоцию»", isShort: true },
  { url: "https://youtube.com/shorts/t_-MEjvHfi8?feature=share", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/Dva%20Dnia.mp4", title: "Shorts — правило двух дней", isShort: true },
  { url: "https://youtube.com/shorts/yiUfj99FnSY?feature=share", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/Jelaemoie.mp4", title: "Shorts — желаемое vs действительное", isShort: true },
  { url: "https://youtube.com/shorts/8bmjCMr8TWE?feature=share", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/reel1.mp4", title: "Shorts — бьюти/свадебная тема", isShort: true, categories: ["Монтаж"] },
  { url: "https://youtube.com/shorts/hbJjgSoK7gg", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/%D0%A1%D0%B2%D0%B0%D0%B4%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5%D0%92%D0%B5%D1%80%D1%82%D0%B8%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B54.10.24f.mp4", title: "Shorts — свадебное видео", isShort: true },
  { url: "https://youtube.com/shorts/Rs27dPgCou8?feature=share", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/otzF.mp4", title: "Отзывы о товаре", isShort: true },
  { url: "https://youtube.com/shorts/mKI5RM9XawE?feature=share", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/blinchiki.mp4", title: "Shorts — готовка: блинчики", isShort: true },
  { url: "https://youtube.com/shorts/dmrYy2lCIrE", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/baklajaniPoOziatskiF.mp4", title: "Shorts — баклажаны по‑азиатски", isShort: true },
  { url: "https://youtube.com/shorts/n1ebRS-7jbI", directVideoUrl: "https://storage.yandexcloud.net/nikita-portfolio-media/videos/DSC_0066Ver1.mp4", title: "Shorts — реклама умной лампы", isShort: true },
];
