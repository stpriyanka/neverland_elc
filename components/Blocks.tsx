import Link from 'next/link';
import {br,bgStyle} from '@/lib/text';
export function PageHero({eyebrow,title,bg}:{eyebrow:string,title:string,bg?:string}){return <section className="page-hero" style={bgStyle(bg)}><div className="hero-circle"/><div className="hero-leaf"/><div className="wrap hero-content"><div className="eyebrow">{eyebrow}</div><h1>{br(title)}</h1></div></section>}
export function Cta({children,href='/enrolment#tour-form',outline=false}:{children:React.ReactNode,href?:string,outline?:boolean}){return <Link href={href} className={'pill '+(outline?'pill-outline':'pill-yellow')}>{children}</Link>}
