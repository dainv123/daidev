import { useState, useEffect } from 'react';
import { getSiteSettings } from '../lib/api';

interface HomeData {
  heroTitle: { en: string; vi: string };
  heroSubtitle: { en: string; vi: string };
  heroDescription: { en: string; vi: string };
  typedStrings: string[];
  contactButtonText: { en: string; vi: string };
  portfolioButtonText: { en: string; vi: string };
}

const defaultHomeData: HomeData = {
  heroTitle: { en: "Hello I'm Dai Nguyen", vi: "Xin chào, tôi là Đại Nguyễn" },
  heroSubtitle: { en: "Senior Web Developer", vi: "Lập trình viên Web cao cấp" },
  heroDescription: { 
    en: "Passionate about creating amazing web experiences", 
    vi: "Đam mê tạo ra những trải nghiệm web tuyệt vời" 
  },
  typedStrings: [
    "Senior Web Developer",
    "Newbie Mobile Developer", 
    "and",
    "Culi in Some Backend Languages"
  ],
  contactButtonText: { en: "Contact Me", vi: "Liên hệ" },
  portfolioButtonText: { en: "View My Work", vi: "Xem dự án" }
};

export const useHomeData = () => {
  const [homeData, setHomeData] = useState<HomeData>(defaultHomeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch site settings for home page
        const settings = await getSiteSettings([
          'hero_title',
          'hero_subtitle', 
          'hero_description',
          'typed_strings',
          'contact_button_text',
          'portfolio_button_text'
        ]);

        // Helper function to handle both old string format and new object format
        const getLocalizedValue = (value: any, defaultValue: { en: string; vi: string }) => {
          if (!value) return defaultValue;
          if (typeof value === 'string') {
            // Old format - return as English
            return { en: value, vi: value };
          }
          if (typeof value === 'object' && value.en && value.vi) {
            // New format
            return value;
          }
          return defaultValue;
        };

        // Update home data with API values or keep defaults
        setHomeData({
          heroTitle: getLocalizedValue(settings.hero_title, defaultHomeData.heroTitle),
          heroSubtitle: getLocalizedValue(settings.hero_subtitle, defaultHomeData.heroSubtitle),
          heroDescription: getLocalizedValue(settings.hero_description, defaultHomeData.heroDescription),
          typedStrings: settings.typed_strings ? JSON.parse(settings.typed_strings) : defaultHomeData.typedStrings,
          contactButtonText: getLocalizedValue(settings.contact_button_text, defaultHomeData.contactButtonText),
          portfolioButtonText: getLocalizedValue(settings.portfolio_button_text, defaultHomeData.portfolioButtonText)
        });
      } catch (err) {
        console.error('Failed to fetch home data:', err);
        setError('Failed to load home data');
        // Keep default values if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return { homeData, loading, error };
}; 