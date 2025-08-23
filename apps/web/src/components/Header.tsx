"use client";

import React from "react";
import Link from "next/link";
import { useHeaderData } from "../hooks/useHeaderData";
import { useTypedAnimation } from "../hooks/useTypedAnimation";
import { useLanguage } from "../hooks/useLanguage";
import { useSignedImageUrl } from "../hooks/useSignedImageUrl";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  const { headerData, loading, error } = useHeaderData();
  const { t } = useLanguage();

  // Use typed animation for header
  const { initTyped } = useTypedAnimation(headerData.typedStrings, {
    typeSpeed: 50,
    backDelay: 500,
    loop: true,
    autoplay: true,
    autoplayTimeout: 500,
    contentType: "html",
    loopCount: true,
  });

  const avatarSignedUrl = useSignedImageUrl(
    headerData.avatarId,
    headerData.avatar
  );

  if (loading) {
    return (
      <header className="header">
        <div className="header-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading header...</p>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="header">
        <div className="header-content">
          <div className="alert alert-danger">
            <p>{error}</p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="profile-picture-block">
            <div className="my-photo">
              <img
                src={avatarSignedUrl || headerData.avatar}
                className="img-fluid"
                alt={t(headerData.name)}
              />
            </div>
          </div>

          {/* Header Head */}
          <div className="site-title-block">
            <div className="site-title">{t(headerData.title)}</div>
            <div className="type-wrap">
              <div className="typed-strings">
                {headerData.typedStrings.map((str, index) => (
                  <span key={index}>{str}</span>
                ))}
              </div>
              <span className="typed"></span>
            </div>
          </div>
          {/* /Header Head */}

          {/* Navigation */}
          <div className="site-nav">
            {/* Main menu */}
            <Navigation menuItems={headerData.menuItems} />
            {/* /Main menu */}

            {/* Copyrights */}
            <div className="copyrights">
              © {new Date().getFullYear()} {t(headerData.copyright)}
            </div>
            {/* / Copyrights */}
          </div>
          {/* /Navigation */}
        </div>
      </header>
      {/* /Header */}

      {/* Mobile Header */}
      <div className="responsive-header">
        <div className="responsive-header-name">
          <img
            className="responsive-logo"
            src={headerData.avatar}
            alt={t(headerData.name)}
          />
          {t(headerData.name)}
        </div>
        <span className="responsive-icon">
          <i className="lnr lnr-menu"></i>
        </span>
      </div>
      {/* /Mobile Header */}
    </>
  );
};

export default Header;
