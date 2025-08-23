"use client";

import React from "react";
import { useAboutData } from "../hooks/useAboutData";
import { useLanguage } from "../hooks/useLanguage";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import { useSignedImageUrl } from "../hooks/useSignedImageUrl";

const AboutSection: React.FC = () => {
  const { aboutData, loading, error } = useAboutData();
  const { t } = useLanguage();
  // Get additional fields from aboutData if available
  const name = aboutData.name || "";
  const location = aboutData.location || "";
  const yearsExp = aboutData.yearsExp || "";
  const projects = aboutData.projects || "";
  const clients = aboutData.clients || "";

  const funFacts = Array.isArray(aboutData.funFacts) ? aboutData.funFacts : [];
  const services = Array.isArray(aboutData.services) ? aboutData.services : [];
  const videoSection = aboutData.videoSection;

  // Ví dụ: nếu có aboutData.photoId hoặc aboutData.photo là key/id ảnh S3
  const photoSignedUrl = useSignedImageUrl(aboutData.photoId, aboutData.photo);

  if (loading) {
    return (
      <section id="about-me" className="sub-page">
        <div className="sub-page-inner">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading about data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about-me" className="sub-page">
        <div className="sub-page-inner">
          <div className="alert alert-danger">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about-me" className="sub-page">
      <div className="sub-page-inner">
        <div className="section-title">
          <div className="main-title">
            <div className="title-main-page">
              <h4>{t(aboutData.title)}</h4>
              <p>{t(aboutData.subtitle)}</p>
            </div>
          </div>
        </div>
        <div className="section-content">
          {/* about me */}
          <div className="row pb-30">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <h3>{t(name)}</h3>
              <span className="about-location">
                <i className="lnr lnr-map-marker"></i> {t(location)}
              </span>
              <p className="about-content">{t(aboutData.description)}</p>
              <ul className="bout-list-summry row">
                <li className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="icon-info">
                    <i className="lnr lnr-briefcase"></i>
                  </div>
                  <div className="details-info">
                    <h6>{yearsExp}</h6>
                    <p>Experience</p>
                  </div>
                </li>
                <li className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="icon-info">
                    <i className="lnr lnr-layers"></i>
                  </div>
                  <div className="details-info">
                    <h6>{projects}</h6>
                    <p>Projects</p>
                  </div>
                </li>
                <li className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="icon-info">
                    <i className="lnr lnr-coffee-cup"></i>
                  </div>
                  <div className="details-info">
                    <h6>{clients}</h6>
                    <p>Clients</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-sm-12 col-md-6 col-lg-6">
              <div className="box-img">
                <img
                  src={photoSignedUrl || aboutData.photo}
                  className="img-fluid"
                  alt="About Dai Nguyen"
                />
              </div>
            </div>
          </div>
          {/* /about me */}

          {/* services */}
          {services.length > 0 && (
            <div className="special-block-bg">
              <div className="section-head">
                <h4>
                  <span>
                    {t({ en: "What Actually I Do", vi: "Tôi thực sự làm gì" })}
                  </span>
                  {t({ en: "My Services", vi: "Dịch vụ của tôi" })}
                </h4>
              </div>
              <div className="row">
                {services.map((service, idx) => (
                  <div
                    className="col-xs-12 col-sm-12 col-md-6 col-lg-6"
                    key={idx}>
                    <div className="services-list">
                      <div className="service-block">
                        <div className="service-icon">
                          <i className={service.icon}></i>
                        </div>
                        <div className="service-text">
                          <h4>{t(service.title)}</h4>
                          <p>{t(service.description)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* /services */}

          {/* Video section */}
          {videoSection && (
            <div className="video-section">
              <div className="overlay pb-40 pt-40">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                      <div className="sub-title">
                        <h6>{t(videoSection.title)}</h6>
                        <h2>{t(videoSection.subtitle)}</h2>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                      <div className="pulse-icon">
                        <div className="icon-wrap">
                          {videoSection.videoUrl && (
                            <a
                              href={videoSection.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer">
                              <i className="fa fa-play"></i>
                            </a>
                          )}
                        </div>
                        <div className="elements">
                          <div className="circle circle-outer"></div>
                          <div className="circle circle-inner"></div>
                          <div className="pulse pulse-1"></div>
                          <div className="pulse pulse-2"></div>
                          <div className="pulse pulse-3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* /Video section */}

          {/* Fun Facts */}
          {funFacts.length > 0 && (
            <div className="row pb-30 pt-30">
              <div className="section-head col-sm-12">
                <h4>
                  <span>Fun</span>
                  Facts
                </h4>
              </div>
              {funFacts.map((fact, idx) => (
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={idx}>
                  <div className="pb-30">
                    <div className="counter-block">
                      <i className={fact.icon}></i>
                      <h4>{t(fact.label)}</h4>
                      <span
                        className="counter-block-value"
                        data-count={fact.value}>
                        {fact.value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* /Fun Facts */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
