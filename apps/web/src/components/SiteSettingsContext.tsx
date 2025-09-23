import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { publicAPI } from "../lib/api";

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
      // Fetch all settings
      const allSettings = await publicAPI.getSiteSettings();

      // Convert array to object for easier access
      const settingsObject: Record<string, any> = {};
      allSettings.forEach((setting) => {
        settingsObject[setting.key] = setting.value;
      });

      setSettings(settingsObject);
    } catch (err: any) {
      console.error("Error fetching site settings:", err);
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
