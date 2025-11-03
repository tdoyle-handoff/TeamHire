import React from "react";
import { useAccessibility, Language } from "@/contexts/AccessibilityContext";
import { cn } from "@/lib/utils";

export const AccessibilityControls: React.FC = () => {
  const { language, setLanguage, languageLabels } = useAccessibility();

  const languages: Language[] = ["en", "es", "zh", "fr", "de"];

  return (
    <div className="relative group">
      <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
        {languageLabels[language]}
      </button>
      <div className="hidden group-hover:block absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(
              "w-full text-left px-4 py-2 text-sm transition-colors",
              language === lang
                ? "bg-blue-100 text-blue-900 font-medium"
                : "text-slate-700 hover:bg-slate-100",
            )}
          >
            {languageLabels[lang]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityControls;
