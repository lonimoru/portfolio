import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-6 text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Никита Резепов · Video Editor</span>

        {/* ссылки всегда ведут на главную + якорь */}
        <nav className="flex gap-6">
          <Link to="/#services" className="hover:text-gray-700">
            Услуги
          </Link>
          <Link to="/#portfolio" className="hover:text-gray-700">
            Портфолио
          </Link>
          <Link to="/#contact" className="hover:text-gray-700">
            Контакты
          </Link>
        </nav>
      </div>
    </footer>
  );
}
