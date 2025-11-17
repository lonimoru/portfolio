// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 text-xs md:text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-6 text-center">
        © {new Date().getFullYear()} Никита Резепов · Видеомонтаж и нейросети
      </div>
    </footer>
  );
}
