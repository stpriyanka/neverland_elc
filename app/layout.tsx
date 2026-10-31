import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, CookieConsent } from '@/components/Shell';
import { getContent } from '@/lib/content';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: {default:'Neverland ELC | Early Learning Centre',template:'%s | Neverland ELC'}, description:'Neverland ELC — early learning through play, curiosity and belonging in Banani, Dhaka.' };
export default async function RootLayout({children}:{children:React.ReactNode}) { const c = await getContent(); return <html lang="en"><body><Header phone={c['site.phone']}/>{children}<Footer line={c['site.footer']}/><CookieConsent/></body></html> }
