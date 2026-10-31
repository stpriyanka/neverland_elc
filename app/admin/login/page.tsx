import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function AdminLogin() {
  if (await isAdmin()) redirect('/admin');
  return <main className="section wrap"><LoginForm /></main>;
}
