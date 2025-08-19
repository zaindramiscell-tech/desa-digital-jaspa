import { SetelanForm } from '@/components/admin/SetelanForm';
import { getSetelan } from '@/lib/setelan';

export const revalidate = 0;

export default async function AdminSetelanPage() {
  const data = await getSetelan();

  return (
      <SetelanForm dataAwal={data} />
  );
}
