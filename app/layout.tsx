import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, CookieConsent } from '@/components/Shell';
import { getContent } from '@/lib/content';
import { DM_Sans, Libre_Baskerville } from 'next/font/google';
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-dm' });
const libre = Libre_Baskerville({ subsets: ['latin'], weight: ['700'], variable: '--font-libre' });
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: {default:'Neverland ELC | Early Learning Centre',template:'%s | Neverland ELC'}, description:'Neverland ELC — early learning through play, curiosity and belonging in Banani, Dhaka.' };
export default async function RootLayout({children}:{children:React.ReactNode}) { if (process.env.SITE_MODE === 'temp') return <html lang="en" className={`${dmSans.variable} ${libre.variable}`}><body>{children}</body></html>; const c = await getContent(); return <html lang="en"><body><Header phone={c['site.phone']}/>{children}<Footer line={c['site.footer']}/><CookieConsent/></body></html> }
