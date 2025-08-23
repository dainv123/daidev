"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import HomeSection from "./HomeSection";
import AboutSection from "./AboutSection";
import ThemesSection from "./ThemeSection";
import ContactSection from "./ContactSection";
import ResumeSection from "./ResumeSection";
import BlogSection from "./BlogSection";
import BlogDetail from "./BlogDetail";
import ThemeDetail from "./ThemeDetail";
import { SiteSettingsProvider } from "./SiteSettingsContext";
import { TagProvider } from "./TagContext";

type PageType = "home" | "about" | "resume" | "theme" | "blog" | "contact";

interface AppState {
  currentPage: PageType;
  themeSlug?: string;
  blogSlug?: string;
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({ currentPage: "home" });

  // Handle URL changes for SPA navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      const pathParts = hash.split("/");

      if (pathParts[0] === "theme" && pathParts[1]) {
        setAppState({ currentPage: "theme", themeSlug: pathParts[1] });
      } else if (pathParts[0] === "blog" && pathParts[1]) {
        setAppState({ currentPage: "blog", blogSlug: pathParts[1] });
      } else {
        setAppState({ currentPage: pathParts[0] as PageType });
      }
    };

    // Set initial page based on URL
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Function to navigate to different pages
  const navigateTo = (page: PageType, themeSlug?: string) => {
    if (page === "theme" && themeSlug) {
      window.location.hash = `theme/${themeSlug}`;
    } else {
      window.location.hash = page;
    }
  };

  // Render the appropriate section based on current page
  const renderCurrentPage = () => {
    switch (appState.currentPage) {
      case "home":
        return (
          <>
            <HomeSection />
            {/* <AboutSection />
            <ThemesSection />
            <ContactSection /> */}
          </>
        );
      case "about":
        return <AboutSection />;
      case "resume":
        return <ResumeSection />;
      case "theme":
        return appState.themeSlug ? (
          <ThemeDetail slug={appState.themeSlug} />
        ) : (
          <ThemesSection />
        );
      case "blog":
        return appState.blogSlug ? (
          <BlogDetail slug={appState.blogSlug} />
        ) : (
          <BlogSection />
        );
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <TagProvider>
      <SiteSettingsProvider>
        {/* Header */}
        <Header />

        {/* Main Content Pages */}
        <div className="content-pages">
          {/* Subpages */}
          <div className="sub-home-pages">{renderCurrentPage()}</div>
          {/* /Page changer wrapper */}
        </div>
        {/* /Main Content */}
      </SiteSettingsProvider>
    </TagProvider>
  );
};

export default App;
