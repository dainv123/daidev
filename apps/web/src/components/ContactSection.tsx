"use client";

import React, { useEffect, useState } from "react";
import { submitContact } from "../lib/api";
import { useLanguage } from "../hooks/useLanguage";
import { useSiteSettings } from "./SiteSettingsContext";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Lấy contact info từ context
  const contactInfo = {
    email: settings.social_email,
    phone: settings.social_phone,
    address: settings.social_address,
    github: settings.social_github,
    linkedin: settings.social_linkedin,
    twitter: settings.social_twitter,
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = t({ en: "Name is required", vi: "Tên là bắt buộc" });
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t({
        en: "Name must be at least 2 characters",
        vi: "Tên phải có ít nhất 2 ký tự",
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t({ en: "Email is required", vi: "Email là bắt buộc" });
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t({
        en: "Please enter a valid email",
        vi: "Vui lòng nhập email hợp lệ",
      });
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = t({
        en: "Subject is required",
        vi: "Tiêu đề là bắt buộc",
      });
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = t({
        en: "Subject must be at least 5 characters",
        vi: "Tiêu đề phải có ít nhất 5 ký tự",
      });
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = t({
        en: "Message is required",
        vi: "Tin nhắn là bắt buộc",
      });
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t({
        en: "Message must be at least 10 characters",
        vi: "Tin nhắn phải có ít nhất 10 ký tự",
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form first
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitStatus("idle");

    try {
      // Prepare data for API
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        tenantId: "default",
      };

      // Submit using API service
      await submitContact(contactData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="sub-page">
      <div className="sub-page-inner">
        <div className="section-title">
          <div className="main-title">
            <div className="title-main-page">
              <h4>{t({ en: "Contact", vi: "Liên hệ" })}</h4>
              <p>{t({ en: "Get in touch", vi: "Kết nối với tôi" })}</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row contact-form pb-30">
          <div className="col-sm-12 col-md-5 col-lg-5 left-background">
            <img src="/assets/images/mailbox.png" alt="Contact" />
          </div>
          <div className="col-sm-12 col-md-7 col-lg-7">
            <div className="form-contact-me">
              <div id="show_contact_msg">
                {submitStatus === "success" && (
                  <div className="alert alert-success">
                    <i className="fa fa-check"></i>{" "}
                    {t({
                      en: "Thank you! Your message has been sent successfully.",
                      vi: "Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.",
                    })}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="alert alert-danger">
                    <i className="fa fa-exclamation-triangle"></i>{" "}
                    {t({
                      en: "Sorry! There was an error sending your message. Please try again.",
                      vi: "Xin lỗi! Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.",
                    })}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} id="contact-form">
                <div className="form-group">
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder={t({ en: "Name:", vi: "Tên:" })}
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder={t({ en: "Email:", vi: "Email:" })}
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    name="subject"
                    id="subject"
                    type="text"
                    placeholder={t({ en: "Subject:", vi: "Tiêu đề:" })}
                    autoComplete="off"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={errors.subject ? "error" : ""}
                  />
                  {errors.subject && (
                    <span className="error-message">{errors.subject}</span>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    placeholder={t({ en: "Message:", vi: "Tin nhắn:" })}
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={errors.message ? "error" : ""}></textarea>
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>

                <input
                  className="bt-submit"
                  type="submit"
                  value={
                    loading
                      ? t({ en: "Sending...", vi: "Đang gửi..." })
                      : t({ en: "Send Message", vi: "Gửi Tin Nhắn" })
                  }
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        </div>
        {/* /Contact Form */}

        {/* Contact Details */}
        <div className="pt-50 pb-30">
          <div className="section-head">
            <h4>
              <span>Contact Information</span>
              Find me here
            </h4>
          </div>

          {/* Contact Info */}
          <div className="sidebar-textbox row pb-50">
            <div className="contact-info d-flex col-md-4">
              <div className="w-25">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
              </div>
              <div className="contact-text w-75">
                <h2>Phone</h2>
                <p>(+84) 123 456 789</p>
                <p>(+84) 987 654 321</p>
              </div>
            </div>
            <div className="contact-info d-flex col-md-4">
              <div className="w-25">
                <div className="contact-icon">
                  <i className="far fa-envelope-open"></i>
                </div>
              </div>
              <div className="contact-text w-75">
                <h2>Email</h2>
                <p>dai@daidev.com</p>
                <p>contact@daidev.com</p>
              </div>
            </div>
            <div className="contact-info d-flex col-md-4">
              <div className="w-25">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="contact-text w-75">
                <h2>Address</h2>
                <p>
                  Ho Chi Minh City, <br /> Vietnam
                </p>
              </div>
            </div>
          </div>
          {/* /Contact info */}

          {/* Map Container */}
          <div className="contact-map pt-50">
            {/* GOOGLE MAP */}
            <div id="google-map"></div>
          </div>
          {/* /Map Container */}

          {/* Social Media */}
          <div className="pt-50">
            <div className="social-media-block">
              <h4>Follow Me: </h4>
              <ul className="social-media-links">
                <li>
                  <a
                    href="https://github.com/daidev"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/daidev"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/daidev"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/daidev"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/daidev"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/daidev"
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* /Social Media */}
        </div>
        {/* /Contact Details */}
      </div>
    </section>
  );
};

export default ContactSection;
