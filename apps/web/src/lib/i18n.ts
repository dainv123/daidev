export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'vi'],
  localeDetection: true,
};

export const getLocaleFromPath = (pathname: string): string => {
  const segments = pathname.split('/');
  const locale = segments[1];
  return i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale;
};

export const getLocalizedPath = (pathname: string, locale: string): string => {
  const segments = pathname.split('/');
  if (i18nConfig.locales.includes(segments[1])) {
    segments[1] = locale;
  } else {
    segments.splice(1, 0, locale);
  }
  return segments.join('/');
}; 