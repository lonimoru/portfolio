import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { SeoMetadata } from "./components/SeoMetadata";

import Home from "./pages/Home";
import Projects from "./pages/Projects";

function ScrollManager() {
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const timer = window.setTimeout(() => {
    if (hash) {
      const id = hash.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="focus-ring fixed left-4 top-3 z-[200] -translate-y-20 rounded-lg bg-white px-4 py-2 font-semibold text-slate-950 transition focus:translate-y-0"
      >
        Перейти к содержимому
      </a>
      <SeoMetadata />
      <Navigation />
      <ScrollManager />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
