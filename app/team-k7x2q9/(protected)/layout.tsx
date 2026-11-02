import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false, nocache: true } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/team-k7x2q9/login');
  return <div className="section wrap">{children}</div>;
}
