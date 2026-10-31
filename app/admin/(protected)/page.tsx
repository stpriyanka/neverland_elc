import { PAGES } from '@/lib/cms-schema';
import { getContent } from '@/lib/content';
import { AdminEditor } from '@/components/admin/AdminEditor';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  return <AdminEditor pages={PAGES} initial={await getContent()} />;
}
