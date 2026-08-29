import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://nikitarezepov.ru";
const SOCIAL_IMAGE_URL = `${SITE_URL}/og.jpg`;

type PageMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
};

const HOME_METADATA: PageMetadata = {
  title: "Никита Резепов — видеомонтаж и моушн-дизайн | Видео для рекламы и соцсетей",
  description:
    "Профессиональный видеомонтаж для рекламы, YouTube, Shorts и соцсетей: цвет, звук, motion-графика и AI-видео. Работаю удалённо по всей России.",
  canonicalUrl: `${SITE_URL}/`,
};

const PROJECTS_METADATA: PageMetadata = {
  title: "Проекты по видеомонтажу — Никита Резепов",
  description:
    "Портфолио Никиты Резепова: рекламные ролики, YouTube-видео, Shorts, motion-графика, анимация логотипов и AI-видео.",
  canonicalUrl: `${SITE_URL}/projects`,
};

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

export function SeoMetadata() {
  const { pathname } = useLocation();
  const metadata = pathname === "/projects" ? PROJECTS_METADATA : HOME_METADATA;

  useLayoutEffect(() => {
    document.title = metadata.title;
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", metadata.canonicalUrl);

    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:url"]', metadata.canonicalUrl);
    setMetaContent('meta[property="og:image"]', SOCIAL_IMAGE_URL);
    setMetaContent('meta[name="twitter:title"]', metadata.title);
    setMetaContent('meta[name="twitter:description"]', metadata.description);
    setMetaContent('meta[name="twitter:image"]', SOCIAL_IMAGE_URL);
  }, [metadata]);

  return null;
}
