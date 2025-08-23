"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { Mail, Briefcase, ArrowDown } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useHeaderData } from "../hooks/useHeaderData";

export default function HeroSection() {
  const { headerData, loading, error } = useHeaderData();
  const [isVisible, setIsVisible] = useState(false);
  const { t, i18n } = useTranslation("home");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return <div>Loading hero...</div>;
  }
  if (error) {
    return <div>Error loading hero: {error}</div>;
  }

  const typingStrings = headerData.typedStrings || [];
  const greeting = headerData.title?.[i18n.language as "en" | "vi"] || "";
  const name = headerData.name?.[i18n.language as "en" | "vi"] || "";
  const description = headerData.subtitle?.[i18n.language as "en" | "vi"] || "";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            {greeting} {name}
          </h1>

          <div className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
            <TypeAnimation
              sequence={typingStrings}
              speed={50}
              repeat={Infinity}
              className="text-primary-600 dark:text-primary-400 font-semibold"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => scrollToSection("contact")}
            className="flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Mail className="mr-2" size={20} />
            {t("contactMe")}
          </button>

          <button
            onClick={() => scrollToSection("theme")}
            className="flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600">
            <Briefcase className="mr-2" size={20} />
            {t("viewThemes")}
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <span className="text-sm mb-2">{t("scrollDown")}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}>
              <ArrowDown size={24} />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 right-20 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-20 left-20 w-24 h-24 bg-accent-200 dark:bg-accent-800 rounded-full opacity-20 blur-3xl"
      />
    </section>
  );
}
