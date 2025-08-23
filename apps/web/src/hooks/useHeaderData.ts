import { useSiteSettings } from '../components/SiteSettingsContext';

export const useHeaderData = () => {
  const { settings, loading, error } = useSiteSettings();

  // Helper function to handle both old string format and new object format
  const getLocalizedValue = (value: any, defaultValue: { en: string; vi: string }) => {
    if (!value) return defaultValue;
    if (typeof value === 'string') {
      return { en: value, vi: value };
    }
    if (typeof value === 'object' && value.en && value.vi) {
      return value;
    }
    return defaultValue;
  };

  // Parse menu items if available
  let menuItems = [];
  if (settings.header_menu_items) {
    try {
      const parsedMenuItems = JSON.parse(settings.header_menu_items);
      menuItems = parsedMenuItems.map((item: any) => ({
        ...item,
        label: getLocalizedValue(item.label, { en: 'Menu Item', vi: 'Mục menu' })
      }));
    } catch (e) {
      menuItems = [];
    }
  }

  // Parse typed strings if available
  let typedStrings = [];
  if (settings.header_typed_strings) {
    try {
      typedStrings = JSON.parse(settings.header_typed_strings);
    } catch (e) {
      typedStrings = [];
    }
  }

  const headerData = {
    name: getLocalizedValue(settings.header_name, { en: '', vi: '' }),
    title: getLocalizedValue(settings.header_title, { en: '', vi: '' }),
    subtitle: getLocalizedValue(settings.header_subtitle, { en: '', vi: '' }),
    avatar: settings.header_avatar || '',
    typedStrings,
    menuItems,
    copyright: getLocalizedValue(settings.header_copyright, { en: '', vi: '' })
  };

  return { headerData, loading, error };
}; 