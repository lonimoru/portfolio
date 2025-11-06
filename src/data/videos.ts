export type VideoItem = {
  url: string;
  title: string;
  subtitle?: string; // вторая строка под названием (опционально)
   isShort?: boolean; // ← добавили
};

export const longVideos: VideoItem[] = [
  { url: "https://youtu.be/RctOuZDoRoE", title: "ГРОМ.KO — Akatsuki Drums (промо)", subtitle: "Концертный промо-ролик" },
  { url: "https://youtu.be/n8lYENa718c", title: "Дудл-видео (doodle video)", subtitle: "Объясняющее видео" },
  { url: "https://youtu.be/06jxSi6jtik", title: "Бьюти-ролик", subtitle: "Нарезка/коллаж" },
  { url: "https://youtu.be/zGbYBkSNT54", title: "3D анимация логотипа — CISM" },
  { url: "https://youtu.be/t8KCWUoMhck", title: "Подборка видео с нейросетями", subtitle: "демо возможностей" },
  { url: "https://youtu.be/5WPjoD-h-sI", title: "Ролик для курса Imagine B", subtitle: "анонс/промо" },
  // …остальные (можно постепенно дополнять subtitle где нужно)


// — Остальные длинные (горизонтальные) видео

  { url: "https://youtu.be/RctOuZDoRoE", title: "Ролик для группы ТО2", subtitle: "Ролик редактировался с использованием ИИ" },
  { url: "https://youtu.be/rqVoWXKTRvA", title: "Заставка для группы ТО2", subtitle: "Концертный промо-ролик" },
  { url: "https://youtu.be/0yhNlKWiBLM", title: "MAXFit‑LUX — магнитно‑волновой массаж (обзор/демо)" },
  { url: "https://youtu.be/OX7KYx-0XW4", title: "Поздравление с юбилеем — ИИ‑видео + слайдшоу" },
  { url: "https://youtu.be/nDxGK9GAxVs", title: "Архыз — спортивный тревел‑ролик (лыжи)" },
  { url: "https://youtu.be/mlglY1SOS4w?si=rId0vUsDJqAerkcP", title: "Канал про бокс — полный монтаж + озвучка ИИ" },
  { url: "https://www.youtube.com/watch?v=--jFRdI6VKc", title: "Графика для ролика (кроме интро)" },
  { url: "https://youtu.be/L_tpkisF9ug?si=tm3O-1BR5M2cnDGm", title: "Монтаж про пошив жакета — ателье" },
  { url: "https://youtu.be/eXCBZyd-yU4", title: "Гайд: регистрация на Binance" },
  { url: "https://youtu.be/mpgd4V0EPVM?si=vmyChZKQoHH6j2pQ", title: "Экскурсионный тур: Алтай и Монголия (промо)" },
  { url: "https://youtu.be/RctOuZDoRoE", title: "ГРОМ.КО — стильная нейросеть/IRL (катаны)" },
  { url: "https://youtu.be/geFuYlVRazU", title: "MAXFit Magic Chair — рекламный ролик" },
  { url: "https://youtu.be/KA6YeQOFRo4", title: "Интро — канал «Жёлтый Камыш»" },
  { url: "https://youtu.be/6jLE4o2EI_w", title: "Анимация лого — «Боец на ринге»" },
  { url: "https://youtu.be/YvehMG95G4Q", title: "Трейлер игры — анимация картинок + монтаж" },
  { url: "https://youtu.be/8eCtJfvN3Jo", title: "Новогодняя анимация лого — ИНК" },
  { url: "https://youtu.be/nwNWaS9Xy6s", title: "Пример анимации плашек" },
  { url: "https://youtu.be/JoUVyYe9qZE", title: "Видеоролик для аптеки" },
  { url: "https://youtu.be/NSOj2vyoF_s", title: "Анимация карты с движением" },
  { url: "https://youtu.be/6TuhZz3pv3k", title: "Интервью с Дмитрием Красиловым — монтаж" },
  { url: "https://youtu.be/Nss4Qq0OhqE", title: "Реклама яхтенных туров" },
  { url: "https://youtu.be/uknwS-KmvA8", title: "Субтитры для интервью (создание и вёрстка)" },
];

// — Shorts (вертикальные 9:16)
export const shortsVideos: VideoItem[] = [
  { url: "https://youtube.com/shorts/BUm70HfCbPo?si=8nHYklaHpu5CxA9E", title: "Shorts — для канала режиссёра", isShort: true },
  { url: "https://youtube.com/shorts/kT_tCGSeGuM?si=R9pq-UianqZlKqTo", title: "Shorts — тоже для канала режиссёра", isShort: true },
  { url: "https://youtube.com/shorts/MWFQ4RWZMXQ?feature=share", title: "Shorts — трейлер книги (кот/пёс)", isShort: true },
  { url: "https://youtube.com/shorts/mKI5RM9XawE?feature=share", title: "Shorts — готовка: блинчики", isShort: true },
  { url: "https://youtube.com/shorts/w-AeMxw1kGw", title: "Shorts — «как проживать эмоцию»", isShort: true },
  { url: "https://youtube.com/shorts/t_-MEjvHfi8?feature=share", title: "Shorts — правило двух дней", isShort: true },
  { url: "https://youtube.com/shorts/yiUfj99FnSY?feature=share", title: "Shorts — желаемое vs действительное", isShort: true },
  { url: "https://youtube.com/shorts/8bmjCMr8TWE?feature=share", title: "Shorts — бьюти/свадебная тема", isShort: true },
  { url: "https://youtube.com/shorts/hbJjgSoK7gg", title: "Shorts — свадебное видео (укорочено)", isShort: true },
  { url: "https://youtube.com/shorts/dmrYy2lCIrE", title: "Shorts — баклажаны по‑азиатски", isShort: true },
  { url: "https://youtube.com/shorts/n1ebRS-7jbI", title: "Shorts — реклама умной лампы", isShort: true },
];