import React from "react";
import { useAccessibility, Language } from "@/contexts/AccessibilityContext";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export const AccessibilityControls: React.FC = () => {
  const {
    language,
    setLanguage,
    readAloudEnabled,
    setReadAloudEnabled,
    languageLabels,
    isSpeaking,
  } = useAccessibility();

  const languages: Language[] = ["en", "es", "zh", "fr", "de"];

  return (
    <div className="flex items-center gap-3">
      {/* Language Selector */}
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
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Read Aloud Toggle */}
      <button
        onClick={() => setReadAloudEnabled(!readAloudEnabled)}
        className={cn(
          "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
          readAloudEnabled
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        )}
        title="Enable read-aloud feature for accessibility"
      >
        {isSpeaking ? (
          <VolumeX className="w-4 h-4 animate-pulse" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">
          {readAloudEnabled ? "Read Aloud On" : "Read Aloud Off"}
        </span>
      </button>
    </div>
  );
};

export default AccessibilityControls;
