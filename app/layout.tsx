import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, CookieConsent } from '@/components/Shell';
export const metadata: Metadata = { title: {default:'Neverland ELC | Early Learning Centre',template:'%s | Neverland ELC'}, description:'Neverland ELC — early learning through play, curiosity and belonging in Banani, Dhaka.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><Header/>{children}<Footer/><CookieConsent/></body></html> }
