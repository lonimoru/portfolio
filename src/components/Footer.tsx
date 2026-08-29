import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080e19] py-8 text-sm text-slate-400">
      <div className="site-container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Никита Резепов · Видеомонтаж и постпродакшн</p>
        <div className="flex items-center gap-5">
          <Link to="/projects" className="focus-ring rounded text-slate-300 hover:text-white">
            Проекты
          </Link>
          <a href="/#contact" className="focus-ring rounded text-slate-300 hover:text-white">
            Контакты
          </a>
        </div>
      </div>
    </footer>
  );
}
