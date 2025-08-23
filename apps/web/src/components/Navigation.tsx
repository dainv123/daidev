"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

interface MenuItem {
  label: { en: string; vi: string };
  url: string;
  icon: string;
  order: number;
}

interface NavigationProps {
  menuItems: MenuItem[];
}

const Navigation: React.FC<NavigationProps> = ({ menuItems }) => {
  const { t } = useLanguage();
  const [currentHash, setCurrentHash] = useState<string>("");

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1) || "home");
    };

    // Set initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Sort menu items by order
  const sortedMenuItems = [...menuItems].sort((a, b) => a.order - b.order);

  // Handle navigation click
  const handleNavigation = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    const hash = url === "/" ? "home" : url.slice(1);
    window.location.hash = hash;
  };

  return (
    <ul className="header-main-menu" id="header-main-menu">
      {sortedMenuItems.map((item, index) => {
        // Check if current route is active
        const itemHash = item.url === "/" ? "home" : item.url.slice(1);
        const isActive = currentHash === itemHash;

        return (
          <li key={index}>
            <a
              href={item.url}
              className={isActive ? "active" : ""}
              onClick={(e) => handleNavigation(item.url, e)}>
              <i className={item.icon}></i> {t(item.label)}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
