import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es" | "pt" | "ht" | "zh";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.findJob": "Find a Job",
    "nav.postJob": "Post a Job",
    "nav.messages": "Messages",
    "nav.dashboard": "Dashboard",
    "nav.howItWorks": "How It Works",
    "nav.about": "About",
    "categories.title": "Explore Essential Work Opportunities",
    "categories.subtitle":
      "Access dignified, fair-paying jobs across essential industries.",
    "safety.title": "Built on Trust, Safety & Transparency",
    "safety.subtitle":
      "We protect workers and employers with verification, fair wages, and clear expectations.",
    "safety.verified": "Verified employers and workers",
    "safety.background": "Optional background checks",
    "safety.privacy": "Private by default",
    "safety.fairWages": "Fair wages disclosed upfront",
    "safety.ratings": "Employers rated for fairness",
    "cta.postJob": "Post a Job",
    "cta.findWork": "Find Work",
    "footer.copyright": "© 2024 TeamHire. All rights reserved.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.findJob": "Encontrar Trabajo",
    "nav.postJob": "Publicar Trabajo",
    "nav.messages": "Mensajes",
    "nav.dashboard": "Panel",
    "nav.howItWorks": "Cómo Funciona",
    "nav.about": "Acerca de",
    "categories.title": "Explora Oportunidades de Trabajo Esencial",
    "categories.subtitle":
      "Accede a trabajos dignos y bien pagados en industrias esenciales.",
    "safety.title": "Construido en Confianza, Seguridad y Transparencia",
    "safety.subtitle":
      "Protegemos a trabajadores y empleadores con verificación, salarios justos y expectativas claras.",
    "safety.verified": "Empleadores y trabajadores verificados",
    "safety.background": "Verificaciones de antecedentes opcionales",
    "safety.privacy": "Privado por defecto",
    "safety.fairWages": "Salarios justos divulgados por adelantado",
    "safety.ratings": "Empleadores calificados por equidad",
    "cta.postJob": "Publicar Trabajo",
    "cta.findWork": "Buscar Trabajo",
    "footer.copyright": "© 2024 TeamHire. Todos los derechos reservados.",
  },
  pt: {
    "nav.home": "Início",
    "nav.findJob": "Encontrar Trabalho",
    "nav.postJob": "Postar Trabalho",
    "nav.messages": "Mensagens",
    "nav.dashboard": "Painel",
    "nav.howItWorks": "Como Funciona",
    "nav.about": "Sobre",
    "categories.title": "Explore Oportunidades de Trabalho Essencial",
    "categories.subtitle":
      "Acesse trabalhos dignos e bem remunerados em indústrias essenciais.",
    "safety.title": "Construído em Confiança, Segurança e Transparência",
    "safety.subtitle":
      "Protegemos trabalhadores e empregadores com verificação, salários justos e expectativas claras.",
    "safety.verified": "Empregadores e trabalhadores verificados",
    "safety.background": "Verificações de antecedentes opcionais",
    "safety.privacy": "Privado por padrão",
    "safety.fairWages": "Salários justos divulgados antecipadamente",
    "safety.ratings": "Empregadores classificados por equidade",
    "cta.postJob": "Postar Trabalho",
    "cta.findWork": "Encontrar Trabalho",
    "footer.copyright": "© 2024 TeamHire. Todos os direitos reservados.",
  },
  ht: {
    "nav.home": "Akèy",
    "nav.findJob": "Chèche Travay",
    "nav.postJob": "Poste Travay",
    "nav.messages": "Mesaj",
    "nav.dashboard": "Pannèl",
    "nav.howItWorks": "Kouman Sa Mache",
    "nav.about": "Sou Nou",
    "categories.title": "Eksplore Opòtinite Travay Esansyèl",
    "categories.subtitle":
      "Resevwa aksè a travay diy e byen peye nan endistri esansyèl.",
    "safety.title": "Bati sou Konfyans, Sekirite ak Transparans",
    "safety.subtitle":
      "Nou pwoteje travayè ak anplwayè yo avèk verifike, salè jis, ak atant klè.",
    "safety.verified": "Anplwayè ak travayè verifye",
    "safety.background": "Verifike jan pwoblem yo opsyonèl",
    "safety.privacy": "Prive pa default",
    "safety.fairWages": "Salè jis devwa divulge davans",
    "safety.ratings": "Anplwayè klase pou ekite",
    "cta.postJob": "Poste Travay",
    "cta.findWork": "Chèche Travay",
    "footer.copyright": "© 2024 TeamHire. Tout dwa rezève.",
  },
  zh: {
    "nav.home": "首页",
    "nav.findJob": "找工作",
    "nav.postJob": "发布工作",
    "nav.messages": "消息",
    "nav.dashboard": "仪表板",
    "nav.howItWorks": "工作原理",
    "nav.about": "关于",
    "categories.title": "探索必要工作机会",
    "categories.subtitle": "在必要的行业中获得有尊严、薪资公平的工作。",
    "safety.title": "建立在信任、安全和透明度之上",
    "safety.subtitle": "我们通过验证、公平工资和明确的期望来保护工人和雇主。",
    "safety.verified": "已验证的雇主和工人",
    "safety.background": "可选的背景检查",
    "safety.privacy": "默认私密",
    "safety.fairWages": "公平工资预先披露",
    "safety.ratings": "根据公平性评定雇主",
    "cta.postJob": "发布工作",
    "cta.findWork": "找工作",
    "footer.copyright": "© 2024 TeamHire。保留所有权利。",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
