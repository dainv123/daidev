"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getThemes, getTags } from "../lib/api";
import { Theme } from "../types/api";
import { Tag } from "../types/api";
import { useTags } from "./TagContext";

const ThemeSection: React.FC = () => {
  const { t } = useLanguage();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [filteredThemes, setFilteredThemes] = useState<Theme[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tagMap } = useTags();

  useEffect(() => {
    fetchThemes();
  }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredThemes(themes);
    } else {
      setFilteredThemes(
        themes.filter((theme) => theme.tags?.includes(activeFilter))
      );
    }
  }, [themes, activeFilter]);

  const fetchThemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getThemes();
      const themesData = response || [];
      setThemes(themesData);
      setFilteredThemes(themesData);
    } catch (err) {
      console.error("Error fetching themes:", err);
      setError("Failed to load themes");
      // Use mock data if API fails
      const fallbackThemes: Theme[] = [];
      setThemes(fallbackThemes);
      setFilteredThemes(fallbackThemes);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleThemeClick = (theme: Theme) => {
    window.location.hash = `theme/${theme.slug || theme._id}`;
  };

  const getFilterCount = (filter: string) => {
    let count: number;
    if (filter === "all") {
      count = themes.length;
    } else {
      count = themes.filter((theme) => theme.tags?.includes(filter)).length;
    }
    return count < 10 ? `0${count}` : `${count}`;
  };

  const allTagIds = Array.from(
    new Set(themes.flatMap((theme) => theme.tags || []))
  );

  const allTagsForFilter = allTagIds.map((id) => ({
    id,
    name: tagMap[id]?.name || id,
  }));

  return (
    <section id="themes" className="sub-page">
      <div className="sub-page-inner">
        <div className="section-title">
          <div className="main-title">
            <div className="title-main-page">
              <h4>{t({ en: "Themes", vi: "Giao diện" })}</h4>
              <p>
                {t({
                  en: "Professional themes and templates for modern web applications.",
                  vi: "Giao diện và template chuyên nghiệp cho ứng dụng web hiện đại.",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="section-content">
          <div className="filter-tabs">
            <button
              className={`fil-cat ${activeFilter === "all" ? "active-filter" : ""}`}
              onClick={() => handleFilterClick("all")}>
              <span>{getFilterCount("all")}</span>{" "}
              {t({ en: "All", vi: "Tất cả" })}
            </button>
            {allTagsForFilter.map((tag) => (
              <button
                key={tag.id}
                className={`fil-cat ${activeFilter === tag.id ? "active-filter" : ""}`}
                onClick={() => handleFilterClick(tag.id)}>
                <span>{getFilterCount(tag.id)}</span> {tag.name}
              </button>
            ))}
          </div>

          <div className="portfolio-grid portfolio-trigger" id="portfolio-page">
            <div className="label-portfolio">
              <span className="rotated-sub">theme</span>
              <span className="project-count">{filteredThemes.length}</span>
            </div>

            {loading ? (
              <div className="row">
                <div className="col-12 text-center">
                  <div className="loading-spinner">
                    <i className="fa fa-spinner fa-spin fa-3x"></i>
                    <p>
                      {t({ en: "Loading themes...", vi: "Đang tải themes..." })}
                    </p>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="row">
                <div className="col-12 text-center">
                  <div className="alert alert-danger">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                {filteredThemes.length === 0 ? (
                  <div className="col-12 text-center">
                    <div className="no-themes">
                      <p>
                        {t({
                          en: "No themes found.",
                          vi: "Không tìm thấy theme nào.",
                        })}
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredThemes.map((theme, index) => (
                    <div
                      key={theme._id}
                      className="col-lg-6 col-md-6 col-sm-12 col-xs-12 portfolio-item all"
                      onClick={() => handleThemeClick(theme)}
                      style={{ cursor: "pointer" }}>
                      <div className="portfolio-img">
                        <img
                          src={
                            theme.previewImage ||
                            `/assets/images/portfolio/portfolio-img-${(index % 8) + 1}.jpeg`
                          }
                          className="img-responsive"
                          alt={t(theme.title)}
                        />
                      </div>
                      <div className="portfolio-data">
                        <h4>
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            {t(theme.title)}
                          </a>
                        </h4>
                        <p className="meta">
                          {(theme.tags || [])
                            .map((tagId) => tagMap[tagId]?.name || tagId)
                            .join(", ")}
                        </p>
                        <div className="portfolio-attr">
                          {theme.demoUrl && (
                            <a
                              href={theme.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}>
                              <i className="lnr lnr-link"></i>
                            </a>
                          )}
                          {theme.sourceUrl && (
                            <a
                              href={theme.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}>
                              <i className="lnr lnr-move"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeSection;
