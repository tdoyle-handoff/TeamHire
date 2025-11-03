import React, { useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en" as const, label: "English" },
    { code: "es" as const, label: "Español" },
    { code: "pt" as const, label: "Português" },
    { code: "ht" as const, label: "Kreyòl" },
    { code: "zh" as const, label: "中文" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-2 text-left text-sm transition-colors",
                language === code
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-secondary text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
