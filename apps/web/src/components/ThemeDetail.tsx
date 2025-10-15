"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ThemeActionHandler } from "../utils/themeActions";
import { Theme, ThemeAction } from "../types/theme";
import { useLanguage } from "@/hooks/useLanguage";
import { useTags } from "./TagContext";

// Fallback to iframe for now
// const ThemeViewer = React.lazy(() => import("themeDetail/ThemeViewer"));

interface ThemeDetailProps {
  slug?: string;
}

const ThemeDetail: React.FC<ThemeDetailProps> = ({ slug }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("theme-1");
  const [currentThemeData, setCurrentThemeData] = useState<Theme | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { tagMap } = useTags();

  // Get theme name from props, URL params, or search params
  const currentThemeName =
    slug || (params?.name as string) || searchParams?.get("theme");

  // Fetch specific theme data
  const fetchThemeData = async (themeId: string) => {
    try {
      const response = await fetch(
        `http://api.daidev.click/api/v1/themes/${themeId}`
      );
      const data = await response.json();
      setCurrentThemeData(data.data);
    } catch (error) {
      console.error("Error fetching theme data:", error);
    }
  };

  // Create theme action handler
  const actionHandler = useMemo(
    () => (currentThemeData ? new ThemeActionHandler(currentThemeData) : null),
    [currentThemeData]
  );

  const availableActions = useMemo(
    () => (actionHandler ? actionHandler.getAvailableActions() : []),
    [actionHandler]
  );

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setSelectedTheme(currentThemeName);

    // Fetch themes and current theme data
    const loadData = async () => {
      // await fetchThemes();
      await fetchThemeData(currentThemeName);
      setIsLoading(false);
    };

    loadData();
  }, [currentThemeName]);

  const handleThemeChange = async (themeId: string) => {
    setSelectedTheme(themeId);
    await fetchThemeData(themeId);

    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set("theme", themeId);
    window.history.pushState({}, "", url.toString());
  };

  const handleActionClick = (action: ThemeAction) => {
    if (!actionHandler) return;

    try {
      actionHandler.executeAction(action);
    } catch (error) {
      console.error("Error executing action:", error);
      setError("Failed to execute action. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading theme: {currentThemeName}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Theme
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!currentThemeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Theme Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested theme could not be found.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="themes" className="sub-page">
      <div className="sub-page-inner">
        <div className="section-title">
          <div className="main-title">
            <div className="title-main-page">
              <h4>{t(currentThemeData.title)}</h4>
              <p>{t(currentThemeData.description)}</p>
            </div>
          </div>
        </div>

        <div className="section-content">
          {/* Theme Preview Frame */}
          {/* Theme Info & Actions */}
          <div
            className="theme-detail-info-wrap"
            style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
              <div style={{ flex: 1, minWidth: 260, marginBottom: 16 }}>
                {/* <div
                  className="theme-detail-title"
                  style={{ marginBottom: 10 }}>
                  {currentThemeData.name}
                </div> */}

                <div className="theme-detail-tags" style={{ marginBottom: 10 }}>
                  {(currentThemeData.tags || []).map((tagId) => (
                    <span className="tag" key={tagId}>
                      #{tagMap[tagId]?.name || tagId}
                    </span>
                  ))}
                </div>
                {/* <div className="theme-detail-desc">
                  {t(currentThemeData.description)}
                </div> */}
                <div style={{ marginBottom: 8 }}>
                  <span className="theme-detail-info-label">Category: </span>
                  <span className="theme-detail-info-value">
                    {currentThemeData.category}
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="theme-detail-info-label">Price: </span>
                  <span className="theme-detail-info-value">
                    {currentThemeData.price}
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="theme-detail-info-label">Author: </span>
                  <span className="theme-detail-info-value">
                    {currentThemeData.author}
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="theme-detail-info-label">Version: </span>
                  <span className="theme-detail-info-value">
                    {currentThemeData.version}
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className="theme-detail-info-label">Status: </span>
                  <span className="theme-detail-info-value">
                    {currentThemeData.status}
                  </span>
                </div>
              </div>
              <div className="theme-detail-actions-wrap">
                <div className="theme-detail-actions-list">
                  {availableActions.map((action) => (
                    <a
                      key={action.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handleActionClick(action);
                      }}
                      className="bt-submit"
                      href={action.href || "#"}
                      title={action.description}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 17,
                        fontWeight: 600,
                        borderRadius: 30,
                        margin: 0,
                        padding: "12px 0",
                        width: "100%",
                        boxSizing: "border-box",
                      }}>
                      <span
                        style={{
                          marginRight: 10,
                          display: "flex",
                          alignItems: "center",
                          fontSize: 20,
                        }}>
                        {action.icon}
                      </span>
                      {action.name}
                      {action.external && (
                        <span
                          style={{ marginLeft: 8, fontSize: 15, opacity: 0.7 }}>
                          ↗
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className="theme-detail-frame"
            style={{ maxWidth: "100%", margin: "0 auto 32px auto" }}>
            <iframe
              src={`http://localhost:3000/theme/${currentThemeData.name}`}
              className="theme-detail-frame-iframe"
              title={`${currentThemeData.name} Theme Preview`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              style={{
                width: "100%",
                overflowY: "visible",
                height: "70vh",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeDetail;
