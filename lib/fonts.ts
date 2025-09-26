import { Notable, Inter } from 'next/font/google';

export const notable = Notable({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-notable',
});

export const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-inter',});