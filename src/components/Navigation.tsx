import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Play, X } from "lucide-react";
import { MOTION_EASE } from "../lib/motion";

type NavItem = {
  name: string;
  href: string;
  section?: string;
  isRoute?: boolean;
};

const navItems: NavItem[] = [
  { name: "Главная", href: "#home", section: "home" },
  { name: "Портфолио", href: "#portfolio", section: "portfolio" },
  { name: "Проекты", href: "/projects", section: "projects", isRoute: true },
  { name: "Обо мне", href: "#about", section: "about" },
  { name: "Услуги", href: "#services", section: "services" },
  { name: "Контакты", href: "#contact", section: "contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    if (location.pathname === "/projects") {
      setActiveSection("projects");
      return;
    }

    const sections = navItems
      .filter((item) => item.section && !item.isRoute)
      .map((item) => document.getElementById(item.section ?? ""))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -62%", threshold: [0.08, 0.25, 0.55] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToHash = (hash: string) => {
    const target = document.getElementById(hash.replace("#", ""));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const go = (item: NavItem) => {
    if (item.isRoute) {
      navigate(item.href);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${item.href}`);
      return;
    }

    if (item.href === "#home") {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    } else {
      scrollToHash(item.href);
    }
    setIsMenuOpen(false);
  };

  const contactItem = navItems.find((item) => item.section === "contact") ?? navItems[0];

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: MOTION_EASE }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled || isMenuOpen
          ? "border-white/10 bg-[#0b1220]/[0.94] shadow-[0_12px_40px_-28px_rgba(0,0,0,.9)] backdrop-blur-xl"
          : "border-white/5 bg-[#0b1220]/[0.76] backdrop-blur-md"
      }`}
    >
      <nav className="site-container" aria-label="Основная навигация">
        <div className="flex h-[72px] items-center justify-between gap-5">
          <Link
            to="/"
            className="focus-ring flex shrink-0 items-center gap-3 rounded-lg text-white"
            aria-label="Никита Резепов — на главную"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-950/30">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="hidden text-[15px] font-bold tracking-tight sm:block">
              Никита Резепов
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = activeSection === item.section;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => go(item)}
                  className={`focus-ring relative rounded-lg px-3 py-3 text-[15px] font-semibold transition-colors ${
                    active ? "text-white" : "text-slate-300 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-blue-400"
                      transition={{ duration: reduceMotion ? 0 : 0.28, ease: MOTION_EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(contactItem)}
              className="primary-button focus-ring hidden min-h-11 px-5 text-sm sm:inline-flex"
            >
              Обсудить проект
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: MOTION_EASE }}
              className="overflow-hidden lg:hidden"
            >
              <div className="grid gap-1 border-t border-white/10 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => go(item)}
                    className={`focus-ring flex min-h-12 items-center justify-between rounded-xl px-4 text-left text-base font-semibold ${
                      activeSection === item.section
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {activeSection === item.section && (
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
