import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

    const core = (await import(`../messages/${locale}.json`)).default;
    const seo = (await import(`../messages/${locale}/seo.json`)).default;

  return {
    locale,
    messages: {
      ...core,
      seo // 
    }
    // ...
  };
});