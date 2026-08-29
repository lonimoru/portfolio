import type { VideoItem } from "../data/videos";

export type ProjectRatio = "16:9" | "9:16";
export type ProjectCategory =
  | "Showreel"
  | "Монтаж"
  | "Видеомонтаж"
  | "Творческие проекты"
  | "Реклама"
  | "YouTube"
  | "AI-видео"
  | "Motion / анимация"
  | "Музыка";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Showreel",
  "Реклама",
  "YouTube",
  "AI-видео",
  "Motion / анимация",
  "Музыка",
];

export function getProjectCategories(video: VideoItem): ProjectCategory[] {
  const text = `${video.title} ${video.subtitle ?? ""}`.toLocaleLowerCase("ru");
  const categories: ProjectCategory[] = [];

  if (/реклам|промо|аптек|тур|maxfit/.test(text)) {
    categories.push("Реклама");
  }
  if (/youtube|канал|гайд|интервью|shorts|субтитр|(?:^|[\s(—-])курс/.test(text)) {
    categories.push("YouTube");
  }
  if (/ии|нейросет|ai-|ai |дудл|оживление/.test(text)) {
    categories.push("AI-видео");
  }
  if (/анимац|логотип|лого|заставк|интро|график|плаш|карт/.test(text)) {
    categories.push("Motion / анимация");
  }
  if (/гром|akatsuki|концерт|музык|групп|то2/.test(text)) {
    categories.push("Музыка");
  }

  return Array.from(new Set([...(video.categories ?? []), ...categories]));
}

export function getProjectTags(video: VideoItem, ratio: ProjectRatio): string[] {
  const categories = getProjectCategories(video);
  const format = ratio === "9:16" ? "Вертикальное" : "16:9";
  return [format, ...(categories.length ? categories : ["Монтаж"])].slice(0, 3);
}
