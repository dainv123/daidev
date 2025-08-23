"use client";

import React from "react";
import { useLanguage, Language } from "../hooks/useLanguage";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => handleLanguageChange("en")}
        title="English">
        EN
      </button>
      <button
        className={`lang-btn ${language === "vi" ? "active" : ""}`}
        onClick={() => handleLanguageChange("vi")}
        title="Tiếng Việt">
        VI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
