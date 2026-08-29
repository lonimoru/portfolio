import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const COUNTER_ID = 112069815;
const PRODUCTION_HOSTNAME = "nikitarezepov.ru";
const SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";
const SCRIPT_ID = "yandex-metrika-script";
const TRACKED_PATHS = new Set(["/", "/projects"]);

type YandexMetrikaInitOptions = {
  defer: boolean;
  webvisor: boolean;
  clickmap: boolean;
  trackLinks: boolean;
  accurateTrackBounce: boolean;
};

type YandexMetrikaHitOptions = {
  title: string;
  referer?: string;
};

type YandexMetrikaCall =
  | [counterId: number, method: "init", options: YandexMetrikaInitOptions]
  | [counterId: number, method: "hit", url: string, options: YandexMetrikaHitOptions];

type YandexMetrikaFunction = {
  (...args: YandexMetrikaCall): void;
  a?: YandexMetrikaCall[];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexMetrikaFunction;
  }
}

const INIT_OPTIONS: YandexMetrikaInitOptions = {
  defer: true,
  webvisor: true,
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
};

let isInitialized = false;
let lastTrackedUrl: string | null = null;

function isProductionWebsite() {
  return import.meta.env.PROD && window.location.hostname === PRODUCTION_HOSTNAME;
}

function ensureYandexMetrika() {
  if (!window.ym) {
    const ym = ((...args: YandexMetrikaCall) => {
      ym.a?.push(args);
    }) as YandexMetrikaFunction;

    ym.a = [];
    ym.l = Date.now();
    window.ym = ym;
  }

  if (
    !document.getElementById(SCRIPT_ID) &&
    !document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_URL}"]`)
  ) {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
  }

  if (!isInitialized) {
    window.ym(COUNTER_ID, "init", INIT_OPTIONS);
    isInitialized = true;
  }
}

export function YandexMetrika() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isProductionWebsite() || !TRACKED_PATHS.has(pathname)) return;

    const currentUrl = window.location.href;
    if (currentUrl === lastTrackedUrl) return;

    const referer = lastTrackedUrl ?? document.referrer;
    const hitOptions: YandexMetrikaHitOptions = {
      title: document.title,
      ...(referer ? { referer } : {}),
    };

    ensureYandexMetrika();
    window.ym?.(COUNTER_ID, "hit", currentUrl, hitOptions);
    lastTrackedUrl = currentUrl;
  }, [pathname]);

  return null;
}
