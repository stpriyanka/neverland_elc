import Link from 'next/link';
export function PageHero({eyebrow,title}:{eyebrow:string,title:string}){return <section className="page-hero"><div className="hero-circle"/><div className="hero-leaf"/><div className="wrap hero-content"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1></div></section>}
export function Cta({children,href='/enrolment#tour-form',outline=false}:{children:React.ReactNode,href?:string,outline?:boolean}){return <Link href={href} className={'pill '+(outline?'pill-outline':'pill-yellow')}>{children}</Link>}
