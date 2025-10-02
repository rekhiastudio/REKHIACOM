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


export const metadata: Metadata = {
  title: {
    default: "Rekhia | UX & Software Development Studio",
    template: "%s | Rekhia"
  },
  description: "Rekhia delivers cutting-edge UX design, web & app development.",
  icons: {
    icon: "/favicon.ico", // icono por defecto
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png" // para dispositivos Apple
  }
};


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
