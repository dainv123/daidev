"use client";

import React from "react";
import { useLanguage } from "../hooks/useLanguage";

interface ExperienceItem {
  title: { en: string; vi: string };
  company: { en: string; vi: string };
  period: { en: string; vi: string };
  description: { en: string; vi: string };
  order: number;
}

interface EducationItem {
  degree: { en: string; vi: string };
  institution: { en: string; vi: string };
  period: { en: string; vi: string };
  description: { en: string; vi: string };
  order: number;
}

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  education: EducationItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  education,
}) => {
  const { t } = useLanguage();

  // Sort by order
  const sortedExperience = [...experience].sort((a, b) => a.order - b.order);
  const sortedEducation = [...education].sort((a, b) => a.order - b.order);

  return (
    <div className="experience-section">
      <div className="row">
        {/* Work Experience */}
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="experience-block">
            <div className="section-head">
              <h4>
                <span>Work</span>
                Experience
              </h4>
            </div>
            <div className="timeline">
              {sortedExperience.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h5>{t(item.title)}</h5>
                      <span className="company">{t(item.company)}</span>
                      <span className="period">{t(item.period)}</span>
                    </div>
                    <p className="timeline-description">
                      {t(item.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="education-block">
            <div className="section-head">
              <h4>
                <span>Education</span>
                Background
              </h4>
            </div>
            <div className="timeline">
              {sortedEducation.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h5>{t(item.degree)}</h5>
                      <span className="institution">{t(item.institution)}</span>
                      <span className="period">{t(item.period)}</span>
                    </div>
                    <p className="timeline-description">
                      {t(item.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
