import { useEffect, useState } from 'react';
import { getSkills, getExperience, getEducation, getLanguages, getCertificates } from '../lib/api';
import { useSiteSettings } from '../components/SiteSettingsContext';

export const useAboutData = () => {
  const { settings } = useSiteSettings();
  const [aboutData, setAboutData] = useState({
    title: { en: '', vi: '' },
    subtitle: { en: '', vi: '' },
    description: { en: '', vi: '' },
    name: { en: '', vi: '' },
    location: { en: '', vi: '' },
    yearsExp: '',
    projects: '',
    clients: '',
    funFacts: [],
    photo: '',
    services: [],
    videoSection: null,
    skills: [],
    experience: [],
    education: [],
    languages: [],
    certificates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getSkills(),
      getExperience(),
      getEducation(),
      getLanguages(),
      getCertificates(),
    ])
      .then(([skills, experience, education, languages, certificates]) => {
        // Parse funFacts if it is a string
        let funFacts = settings.about_fun_facts;
        if (typeof funFacts === 'string') {
          try {
            funFacts = JSON.parse(funFacts);
          } catch {
            funFacts = [];
          }
        }
        if (!Array.isArray(funFacts)) {
          funFacts = [];
        }
        // Parse services if it is a string
        let services = settings.about_services;
        if (typeof services === 'string') {
          try {
            services = JSON.parse(services);
          } catch {
            services = [];
          }
        }
        if (!Array.isArray(services)) {
          services = [];
        }
        // Video section
        const videoSection = settings.about_video_section || null;
        setAboutData((prev) => ({
          ...prev,
          title: settings.about_title || { en: '', vi: '' },
          subtitle: settings.about_subtitle || { en: '', vi: '' },
          description: settings.about_description || { en: '', vi: '' },
          name: settings.about_name || { en: '', vi: '' },
          location: settings.about_location || { en: '', vi: '' },
          yearsExp: settings.about_years_exp || '',
          projects: settings.about_projects || '',
          clients: settings.about_clients || '',
          funFacts,
          photo: settings.about_photo || '',
          services,
          videoSection,
          skills,
          experience,
          education,
          languages,
          certificates,
        }));
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load resume data');
        setLoading(false);
      });
  }, [settings]);

  return { aboutData, loading, error };
}; 