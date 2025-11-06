import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Play } from "lucide-react";

const navItems = [
  { name: "Главная", href: "#home" },
  { name: "Портфолио", href: "#portfolio" },
  { name: "Проекты", href: "/projects", isRoute: true },
  { name: "Обо мне", href: "#about" },
  { name: "Услуги", href: "#services" },
  { name: "Контакты", href: "#contact" },
] as const;

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

  const go = (item: (typeof navItems)[number]) => {
    if ("isRoute" in item && item.isRoute) {
      navigate(item.href);
      setIsMenuOpen(false);
      return;
    }

    // якоря
    if (location.pathname !== "/") {
      navigate("/" + item.href); // вернёмся на главную сразу к секции
      setIsMenuOpen(false);
      return;
    }
    const id = item.href.replace("#", "");
    if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Лого-кнопка домой */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
          </Link>

          {/* Десктоп */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => go(item)}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}

            <Button
              onClick={() => go({ name: "Контакты", href: "#contact" } as any)}
              className={`${
                isScrolled
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              Оставить заявку
            </Button>
          </div>

          {/* Моб. переключатель */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`p-2 ${isScrolled ? "text-gray-600" : "text-white"}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Моб. меню */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => go(item)}
                  className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => go({ name: "Контакты", href: "#contact" } as any)}
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
