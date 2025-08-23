"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getBlogBySlug } from "../lib/api";
import { getTags } from "../lib/api";
import { Blog } from "../types/api";
import { Tag } from "../types/api";
import { useTags } from "./TagContext";

interface BlogDetailProps {
  slug: string;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ slug }) => {
  const { t } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tagMap } = useTags();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getBlogBySlug(slug);
        setBlog(response);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBackToBlog = () => {
    window.location.hash = "blog";
  };

  const getShareUrl = (platform: "facebook" | "twitter" | "linkedin") => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(t(blog.title));
    const summary = encodeURIComponent(t(blog.excerpt));
    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      case "linkedin":
        return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`;
      default:
        return url;
    }
  };

  const handleShare = (
    platform: "facebook" | "twitter" | "linkedin",
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    const shareUrl = getShareUrl(platform);
    window.open(shareUrl, "_blank", "width=600,height=500");
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{t({ en: "Loading blog post...", vi: "Đang tải bài viết..." })}</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="page-content">
        <div className="alert alert-danger">
          <p>
            {error ||
              t({
                en: "Blog post not found.",
                vi: "Không tìm thấy bài viết.",
              })}
          </p>
        </div>
        <button onClick={handleBackToBlog} className="btn btn-primary">
          {t({ en: "Back to Blog", vi: "Quay lại Blog" })}
        </button>
      </div>
    );
  }

  return (
    <section id="blog-detail" className="sub-page">
      <div className="sub-page-inner">
        {/* Blog Header */}
        <div className="section-title">
          <div className="main-title">
            <div className="title-main-page">
              <h4>{t(blog.title)}</h4>
              <p>{t(blog.excerpt)}</p>
            </div>
          </div>
        </div>

        {/* Blog Meta */}
        <div className="blog-detail-meta">
          <span className="blog-author">
            <i className="fas fa-user"></i>
            {t(blog.author)}
          </span>
          <span className="blog-date">
            <i className="fas fa-calendar-alt"></i>
            {formatDate(blog.publishedAt || blog.createdAt)}
          </span>
          <span className="blog-read-time">
            <i className="fas fa-clock"></i>
            {blog.readTime} {t({ en: "min read", vi: "phút đọc" })}
          </span>
        </div>

        {/* Blog Tags */}
        <div className="blog-detail-tags">
          {blog.tags.map((tagId) => (
            <span key={tagId} className="tag">
              #{tagMap[tagId]?.name ? t(tagMap[tagId].name) : tagId}
            </span>
          ))}
        </div>

        {/* Blog Content */}
        <div
          className="blog-detail-content"
          dangerouslySetInnerHTML={{ __html: t(blog.content) }}
        />

        {/* Blog Footer (Share) */}
        <div className="blog-detail-footer">
          <div className="blog-share">
            <h4>{t({ en: "Share this post", vi: "Chia sẻ bài viết này" })}</h4>
            <div className="share-buttons">
              <a
                href="#"
                className="share-btn facebook"
                title="Facebook"
                onClick={(e) => handleShare("facebook", e)}>
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="share-btn twitter"
                title="Twitter"
                onClick={(e) => handleShare("twitter", e)}>
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="share-btn linkedin"
                title="LinkedIn"
                onClick={(e) => handleShare("linkedin", e)}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
