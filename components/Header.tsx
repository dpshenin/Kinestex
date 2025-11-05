
import React from 'react';

export const Header: React.FC = () => {
  const navLinks = [
    { href: "#summary", label: "Резюме" },
    { href: "#kpis", label: "KPI" },
    { href: "#campaigns", label: "Кампании" },
    { href: "#graphDaily", label: "График (дни)" },
    { href: "#heatmap", label: "Тепловая карта" },
    { href: "#meetings", label: "Встречи" },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 grid place-items-center text-white font-extrabold text-lg">KX</div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">Kinestex — Email B2B Leadgen</h1>
            <p className="text-xs text-slate-500">
              Отчет за период: <span className="font-medium">Ноябрь 2025 · Месячный отчет (обновление 05.11)</span>
            </p>
          </div>
        </div>
        <div className="no-print flex items-center gap-2">
          <button onClick={() => window.print()} className="text-xs rounded-full py-1 px-3 bg-indigo-600 text-white hover:bg-indigo-500 transition">
            Печать / PDF
          </button>
          <a href="#campaigns" className="text-xs rounded-full py-1 px-3 bg-sky-600 text-white hover:bg-sky-500 transition hidden sm:block">
            К кампаниям
          </a>
        </div>
      </div>
      <nav className="no-print border-t border-slate-200/80 bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap gap-2 text-xs">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full py-1 px-3 border bg-white hover:bg-slate-50 transition">
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
