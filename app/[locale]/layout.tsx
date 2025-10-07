import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css';
import { NavbarDemo } from '@/components/ui/NavBar';
import { Footer } from '@/components/ui/Footer';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { default: seo } = await import(`@/messages/${locale}/seo.json`);
  const layoutSeo = seo.default;

  return {
    title: {
      default: layoutSeo.title,
      template: layoutSeo.template
    },
    description: layoutSeo.description,
    icons: {
      icon: "/favicon.ico", // icono por defecto
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png" // para dispositivos Apple
    },
    openGraph: {
      title: layoutSeo.title,
      description: layoutSeo.description,
      url: "https://www.rekhia.com",
      siteName: "Rekhia Studio",
      images: [
        {
          url: "https://www.rekhia.com/og-home.png",
          width: 1200,
          height: 630,
          alt: "Rekhia Studio"
        }
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: layoutSeo.title,
      description: layoutSeo.description,
      images: ["https://www.rekhia.com/og-home.png"]
    }
  };
}


export default async function LocaleLayout({children, params}: Props) {

  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  const isRTL = locale === 'he';

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className='dark'>
      <body>
        <NextIntlClientProvider locale={locale}>
          
          <NavbarDemo />
            <div dir={isRTL ? 'rtl' : 'ltr'}>
                {children}
            </div>
          <Footer />
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
