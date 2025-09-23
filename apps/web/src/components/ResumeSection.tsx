"use client";

import React from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useAboutData } from "../hooks/useAboutData";
import { useSignedImageUrl } from "../hooks/useSignedImageUrl";
import { useSiteSettings } from "./SiteSettingsContext";

const ResumeSection: React.FC = () => {
  const { t } = useLanguage();
  const { aboutData, loading, error } = useAboutData();
  const { settings } = useSiteSettings();

  if (loading) {
    return (
      <section id="resume" className="sub-page">
        <div className="sub-page-inner">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading resume data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="resume" className="sub-page">
        <div className="sub-page-inner">
          <div className="alert alert-danger">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const { education, experience, skills, languages } = aboutData;
  // You can add aboutData.languages if you seed and parse it

  return (
    <section id="resume" className="sub-page">
      <div className="sub-page-inner">
        <div className="section-title">
          <div className="main-title">
            <div className="title-main-page">
              <h4>{t({ en: "Resume", vi: "Sơ yếu lý lịch" })}</h4>
              <p>
                {t({
                  en: "My professional background",
                  vi: "Nền tảng chuyên môn của tôi",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="section-content">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              {/* Skills */}
              <div className="pb-30 pt-30">
                <div className="row list-skills">
                  {/* Work Skills */}
                  <div className="col-md-7">
                    <div className="special-block-bg">
                      <div className="section-head">
                        <h4>
                          <span>
                            {t({ en: "My Professional", vi: "Kỹ năng" })}{" "}
                          </span>
                          {t({ en: "Work Skills", vi: "Chuyên môn" })}
                        </h4>
                      </div>
                      <div className="skills-items skills-progressbar">
                        {skills.map((skill, index) => (
                          <div key={skill._id || index} className="skill-item">
                            <h4>{skill.name?.en || skill.name}</h4>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft"
                                data-progress={`${skill.stars * 20 || 0}%`}
                                style={{ width: `${skill.stars * 20 || 0}%` }}
                                data-wow-duration="1.5s"
                                data-wow-delay="1.2s"></div>
                            </div>
                            <span>{skill.stars * 20 || 0}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* /Work Skills */}

                  {/* Languages Skills */}
                  {languages && languages.length > 0 && (
                    <div className="col-md-5">
                      <div className="special-block-bg">
                        <div className="section-head">
                          <h4>
                            <span>
                              {t({ en: "My Professional", vi: "Kỹ năng" })}
                            </span>
                            {t({ en: "Language Skills", vi: "Ngôn ngữ" })}
                          </h4>
                        </div>
                        <div className="skills-items">
                          {languages.map((lang, idx) => (
                            <div
                              className="language-skill row"
                              key={lang._id || idx}>
                              <h4 className="col-md-6 text-left">
                                {lang.name?.en || lang.name}{" "}
                                <span>({lang.level?.en || lang.level})</span>
                              </h4>
                              <div className="col-md-6 text-right">
                                {lang.stars && (
                                  <ul
                                    className="rating"
                                    style={{
                                      display: "inline-block",
                                      margin: 0,
                                      padding: 0,
                                    }}>
                                    {[...Array(lang.stars)].map((_, i) => (
                                      <li key={i}>
                                        <i className="fa fa-star"></i>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {lang.icon && (
                                  <i
                                    className={`flag-icon ${lang.icon}`}
                                    style={{ marginLeft: 8 }}></i>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* /Languages Skills */}
                </div>
              </div>
              {/* /Skills */}

              {/* Certificates Section */}
              <div className="pt-30">
                <div className="section-head">
                  <h4>
                    <span>{t({ en: "My Certificates", vi: "Chứng chỉ" })}</span>
                    {t({ en: "Achievements", vi: "Thành tựu" })}
                  </h4>
                  <a
                    className="bt-submit"
                    href="/assets/file/CV_NguyenVanDai.pdf">
                    <i className="fas fa-cloud-download-alt"></i>{" "}
                    {t({ en: "Download Resume", vi: "Tải CV" })}
                  </a>
                </div>
                <div className="main-timeline">
                  {aboutData.certificates &&
                  aboutData.certificates.length > 0 ? (
                    aboutData.certificates.map((cert, index) => (
                      <CertificateItem
                        key={cert._id || index}
                        cert={cert}
                        index={index}
                        t={t}
                      />
                    ))
                  ) : (
                    <div className="timeline">
                      <div className="timeline-content">
                        <p>
                          {t({
                            en: "No certificates found.",
                            vi: "Không có chứng chỉ nào.",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* /Certificates Section */}

              {/* Work History */}
              <div className="pt-30">
                <div className="section-head col-sm-12">
                  <h4>
                    <span>
                      {t({ en: "My Professional", vi: "Kinh nghiệm" })}
                    </span>
                    {t({ en: "Work History", vi: "Làm việc" })}
                  </h4>
                </div>

                <div className="main-timeline">
                  {experience.map((item, index) => (
                    <div
                      key={item._id || index}
                      className={`timeline ${index === 0 ? "currecnt" : ""}`}>
                      <div className="timeline-icon">
                        <img
                          src={`/assets/images/resume/${index + 2}.png`}
                          alt=""
                        />
                      </div>
                      <div
                        className={`timeline-content ${index === experience.length - 1 ? "s-m-0 pb-0" : ""}`}>
                        <span className="date">
                          {item.period?.en || item.period}
                        </span>
                        <h5 className="title">
                          {item.title?.en || item.title}
                        </h5>
                        <p className="description">
                          {item.description?.en || item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* /Work History */}

              {/* Education History */}
              <div className="pt-30">
                <div className="section-head">
                  <h4>
                    <span>{t({ en: "My Education", vi: "Học vấn" })}</span>
                    {t({ en: "Background History", vi: "Lịch sử" })}
                  </h4>
                </div>
                <div className="main-timeline">
                  {education.map((item, index) => (
                    <div
                      key={item._id || index}
                      className={`timeline ${index === 0 ? "currecnt" : ""}`}>
                      <div className="timeline-icon">
                        <img
                          src={
                            settings.resume_icon_image ||
                            "/assets/images/resume/1.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="timeline-content">
                        <span className="date">
                          {item.period?.en || item.period}
                        </span>
                        <h5 className="title">
                          {item.degree?.en || item.degree}
                        </h5>
                        <p className="description">
                          {item.description?.en || item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* /Education History */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CertificateItem = ({ cert, index, t }) => {
  const certSignedUrl = useSignedImageUrl(cert.imageId, cert.image);
  const getText = (field: any) => {
    if (field && typeof field === "object") {
      return field.en || field.vi || "";
    }
    return field || "";
  };
  return (
    <div
      key={cert._id || index}
      className={`timeline ${index === 0 ? "currecnt" : ""}`}>
      <div className="timeline-icon">
        <img src={certSignedUrl || cert.image} alt="Certificate" />
      </div>
      <div className="timeline-content">
        <span className="date">
          {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : ""}
          {cert.expiryDate
            ? ` - ${new Date(cert.expiryDate).toLocaleDateString()}`
            : ""}
        </span>
        <h5 className="title">{getText(cert.name)}</h5>
        <p className="description">{getText(cert.description)}</p>
        <div className="issuer">
          <strong>{t({ en: "Issuer", vi: "Tổ chức cấp" })}:</strong>{" "}
          {getText(cert.issuer)}
        </div>
        {cert.credentialId && (
          <div className="credential-id">
            <strong>ID:</strong> {cert.credentialId}
          </div>
        )}
        {cert.certificateUrl && (
          <div className="certificate-link">
            <a
              href={cert.certificateUrl}
              target="_blank"
              rel="noopener noreferrer">
              {t({ en: "View Certificate", vi: "Xem chứng chỉ" })}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSection;
