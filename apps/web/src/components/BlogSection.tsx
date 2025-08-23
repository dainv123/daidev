"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getBlogs } from "../lib/api";
import { Blog } from "../types/api";
import { useTags } from "./TagContext";

const BlogSection: React.FC = () => {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tagMap } = useTags();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getBlogs();
        setBlogs(response);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blog posts");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Use blogs directly as in template
  // const displayBlogs = blogs;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="about-me" className="sub-page">
        <div className="sub-page-inner">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>
              {t({ en: "Loading blog posts...", vi: "Đang tải bài viết..." })}
            </p>
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
        {/* Blog Header */}
        <div className="section-title">
          <div className="main-title">
            <div className="title-main-page">
              <h4>{t({ en: "Blog", vi: "Blog" })}</h4>
              <p>
                {t({
                  en: "We share our news and blog",
                  vi: "Chúng tôi chia sẻ tin tức và blog",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="section-content">
          <div className="row blog-grid-flex">
            {blogs.length === 0 ? (
              <div className="col-12">
                <div className="no-posts">
                  <p>
                    {t({
                      en: "No blog posts found.",
                      vi: "Không tìm thấy bài viết nào.",
                    })}
                  </p>
                </div>
              </div>
            ) : (
              blogs.map((blog, index) => {
                // Use exact template structure
                const isQuotePost = index === 0 || index === 7;
                const isLargePost = index === 1;

                return (
                  <div
                    key={blog._id}
                    className={`col-md-${isLargePost ? "8" : "4"} col-sm-6 blog-item${isQuotePost ? "-quote" : ""} blog-item`}>
                    <div className="blog-article">
                      <div className="post-format">
                        <span className="post-format-icon">
                          <i
                            className={
                              isQuotePost
                                ? "fas fa-quote-right"
                                : "lnr lnr-picture"
                            }></i>
                        </span>
                      </div>
                      <div className="comment-like">
                        <span>
                          <i className="fas fa-comment" aria-hidden="true"></i>{" "}
                          {blog.commentCount || 30}
                        </span>
                        <span>
                          <i className="fas fa-heart" aria-hidden="true"></i>{" "}
                          {blog.likeCount || 15}
                        </span>
                      </div>
                      <div className="article-img">
                        <a
                          href={`#blog/${blog.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = `blog/${blog.slug}`;
                          }}>
                          <img
                            src={blog.coverImage}
                            className="img-responsive"
                            alt=""
                          />
                        </a>
                      </div>
                      {!isQuotePost && (
                        <div className="article-link">
                          <a
                            href={`#blog/${blog.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.hash = `blog/${blog.slug}`;
                            }}>
                            <i className="lnr lnr-arrow-right"></i>
                          </a>
                        </div>
                      )}
                      <div className="article-content">
                        {isQuotePost ? (
                          <div>
                            <h4>
                              <a
                                href={`#blog/${blog.slug}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.hash = `blog/${blog.slug}`;
                                }}>
                                {t(blog.title)}
                              </a>
                            </h4>
                            <div className="meta">
                              <span>
                                <i>
                                  {
                                    formatDate(
                                      blog.publishedAt || blog.createdAt
                                    ).split(" ")[0]
                                  }
                                </i>{" "}
                                {formatDate(blog.publishedAt || blog.createdAt)
                                  .split(" ")
                                  .slice(1)
                                  .join(" ")}
                              </span>
                              <span>
                                <i>In</i>{" "}
                                <a href="#">
                                  {tagMap[blog.tags[0]]
                                    ? t(tagMap[blog.tags[0]].name)
                                    : blog.tags[0]}
                                </a>
                              </span>
                              <span>
                                <i>Tags</i>{" "}
                                {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                                  <a key={tagIndex} href="#">
                                    {tagMap[tag]?.name
                                      ? t(tagMap[tag].name)
                                      : tag}
                                  </a>
                                ))}
                              </span>
                            </div>
                            <div className="article-link">
                              <a
                                href={`#blog/${blog.slug}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.hash = `blog/${blog.slug}`;
                                }}>
                                <i className="lnr lnr-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h4>
                              <a
                                href={`#blog/${blog.slug}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.hash = `blog/${blog.slug}`;
                                }}>
                                {t(blog.title)}
                              </a>
                            </h4>
                            <div className="meta">
                              <span>
                                <i>
                                  {
                                    formatDate(
                                      blog.publishedAt || blog.createdAt
                                    ).split(" ")[0]
                                  }
                                </i>{" "}
                                {formatDate(blog.publishedAt || blog.createdAt)
                                  .split(" ")
                                  .slice(1)
                                  .join(" ")}
                              </span>
                              <span>
                                <i>In</i>{" "}
                                <a href="#">
                                  {tagMap[blog.tags[0]]
                                    ? t(tagMap[blog.tags[0]].name)
                                    : blog.tags[0]}
                                </a>
                              </span>
                              <span>
                                <i>Tags</i>{" "}
                                {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                                  <a key={tagIndex} href="#">
                                    {tagMap[tag]?.name
                                      ? t(tagMap[tag].name)
                                      : tag}
                                  </a>
                                ))}
                              </span>
                            </div>
                            <p>{t(blog.excerpt)}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {blogs.length > 0 && (
            <div className="pagination-nav nav-center">
              <a href="#" className="btn btn-prev">
                <i className="lnr lnr-arrow-left"></i> prev
              </a>
              <a href="#" className="btn btn-next">
                next <i className="lnr lnr-arrow-right"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
