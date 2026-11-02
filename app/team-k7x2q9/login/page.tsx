import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata = { title: 'Sign in', robots: { index: false, follow: false, nocache: true } };

export default async function AdminLogin() {
  if (await isAdmin()) redirect('/team-k7x2q9');
  return <main className="section wrap"><LoginForm /></main>;
}
