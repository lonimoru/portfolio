import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Play } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  isRoute?: boolean; // ← ДОБАВИЛИ
};

const navItems: NavItem[] = [
  { name: "Главная", href: "#home" },
  { name: "Портфолио", href: "#portfolio" },
  { name: "Проекты", href: "/projects", isRoute: true },
  { name: "Обо мне", href: "#about" },
  { name: "Услуги", href: "#services" },
  { name: "Контакты", href: "#contact" },
];


export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** плавный скролл с учётом высоты шапки */
  const scrollToHash = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80; // примерная высота шапки
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const go = (item: NavItem | { name: string; href: string; isRoute?: boolean }) => {
    // 1. Отдельный роут (страница проектов)
    if (item.isRoute) {
      navigate(item.href);
      setIsMenuOpen(false);
      return;
    }

    // 2. Якоря (#home, #about и т.д.)
    if (item.href.startsWith("#")) {
      const hash = item.href;

      // если мы НЕ на главной — уходим на /#about, /#services и т.п.
      if (location.pathname !== "/") {
        navigate("/" + hash);
        setIsMenuOpen(false);
        return;
      }

      // уже на главной
      if (hash === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollToHash(hash);
      }

      setIsMenuOpen(false);
      return;
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
          ? "bg-slate-900/95 shadow-lg border-b border-white/10"
          : "bg-slate-900/80 border-b border-white/5"
        }
        backdrop-blur
      `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Лого-кнопка домой */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => go(item)}
                className="font-medium transition-colors text-white/80 hover:text-white"
              >
                {item.name}
              </button>
            ))}

            <Button
              onClick={() => go({ name: "Контакты", href: "#contact" })}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Оставить заявку
            </Button>
          </div>

          {/* Мобильный бургер */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="p-2 text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-white/10 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => go(item)}
                  className="block w-full text-left py-2 text-white/80 hover:text-white font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => go({ name: "Контакты", href: "#contact" })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
              >
                Оставить заявку
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
