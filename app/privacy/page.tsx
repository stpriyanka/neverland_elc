import {getContent} from '@/lib/content';
import {lines} from '@/lib/text';
export default async function Privacy(){const c=await getContent();return <main className="section wrap privacy-page"><h1>{c['privacy.title']}</h1><p><strong>{c['privacy.notice']}</strong></p>{lines(c['privacy.body']).map(x=><p key={x}>{x}</p>)}</main>}
