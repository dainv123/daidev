"use client";

import React from "react";
import Link from "next/link";
import { useHomeData } from "../hooks/useHomeData";
import { useTypedAnimation } from "../hooks/useTypedAnimation";
import { useLanguage } from "../hooks/useLanguage";

// Declare jQuery for typed.js
declare global {
  interface Window {
    $: any;
  }
}

const HomeSection: React.FC = () => {
  const { homeData, loading, error } = useHomeData();
  const { t } = useLanguage();

  // Use typed animation hook
  const { initTyped } = useTypedAnimation(homeData.typedStrings, {
    typeSpeed: 20,
    backDelay: 500,
    loop: true,
    autoplay: true,
    autoplayTimeout: 500,
    contentType: "html",
    loopCount: true,
  });

  if (loading) {
    return (
      <section id="home" className="sub-page start-page">
        <div className="sub-page-inner">
          <div className="mask"></div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="title-block">
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="home" className="sub-page start-page">
        <div className="sub-page-inner">
          <div className="mask"></div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="title-block">
                <div className="alert alert-danger">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="sub-page start-page">
      <div className="sub-page-inner">
        <div className="mask"></div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="title-block">
              <h2>{t(homeData.heroTitle)}</h2>
              <div className="type-wrap">
                <div className="typed-strings">
                  {homeData.typedStrings.map((str, index) => (
                    <span key={index}>{str}</span>
                  ))}
                </div>
                <span className="typed"></span>
              </div>
              <div className="home-buttons">
                <Link href="/contact" className="bt-submit">
                  <i className="lnr lnr-envelope"></i>{" "}
                  {t(homeData.contactButtonText)}
                </Link>
                <Link href="#theme" className="bt-submit">
                  <i className="lnr lnr-briefcase"></i>{" "}
                  {t(homeData.portfolioButtonText)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
