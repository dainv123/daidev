"use client";

import React from "react";
import { useLanguage } from "../hooks/useLanguage";

interface Skill {
  name: { en: string; vi: string };
  percentage: number;
  category: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const { t } = useLanguage();

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  const categoryLabels = {
    frontend: { en: "Frontend", vi: "Frontend" },
    backend: { en: "Backend", vi: "Backend" },
    database: { en: "Database", vi: "Cơ sở dữ liệu" },
    tools: { en: "Tools", vi: "Công cụ" },
  };

  return (
    <div className="skills-section">
      <div className="section-head">
        <h4>
          <span>My</span>
          Skills
        </h4>
      </div>

      <div className="row">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="skills-category">
              <h5>
                {t(
                  categoryLabels[category as keyof typeof categoryLabels] || {
                    en: category,
                    vi: category,
                  }
                )}
              </h5>
              <div className="skills-list">
                {categorySkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{t(skill.name)}</span>
                      <span className="skill-percentage">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
