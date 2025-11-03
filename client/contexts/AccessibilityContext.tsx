import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "es" | "zh" | "fr" | "de";

interface AccessibilityContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  readAloudEnabled: boolean;
  setReadAloudEnabled: (enabled: boolean) => void;
  readAloud: (text: string) => void;
  stopReadAloud: () => void;
  isSpeaking: boolean;
  languageLabels: Record<Language, string>;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

const languageLabels: Record<Language, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
  fr: "Français",
  de: "Deutsch",
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [readAloudEnabled, setReadAloudEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const readAloud = (text: string) => {
    if (!readAloudEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const langMap: Record<Language, string> = {
      en: "en-US",
      es: "es-ES",
      zh: "zh-CN",
      fr: "fr-FR",
      de: "de-DE",
    };

    utterance.lang = langMap[language];
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopReadAloud = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        setLanguage,
        readAloudEnabled,
        setReadAloudEnabled,
        readAloud,
        stopReadAloud,
        isSpeaking,
        languageLabels,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }
  return context;
};
