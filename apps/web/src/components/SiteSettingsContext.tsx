import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getSiteSettings } from "../lib/api";

interface SiteSettingsContextProps {
  settings: Record<string, any>;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextProps | undefined>(
  undefined
);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all settings (hoặc chỉ các key cần thiết)
      const allKeys = [
        // Header
        "header_name",
        "header_title",
        "header_subtitle",
        "header_avatar",
        "header_typed_strings",
        "header_menu_items",
        "header_copyright",
        // About
        "about_title",
        "about_subtitle",
        "about_description",
        "about_skills",
        "about_experience",
        "about_education",
        "about_name",
        "about_location",
        "about_years_exp",
        "about_projects",
        "about_clients",
        "about_fun_facts",
        "about_languages",
        "about_photo",
        "about_services",
        "about_video_section",
        // Contact
        "social_email",
        "social_phone",
        "social_address",
        "social_github",
        "social_linkedin",
        "social_twitter",
        // Thêm các key khác nếu cần
      ];
      const data = await getSiteSettings(allKeys);
      setSettings(data);
    } catch (err: any) {
      setError("Không thể tải site settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider
      value={{ settings, loading, error, refresh: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx)
    throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  return ctx;
};
