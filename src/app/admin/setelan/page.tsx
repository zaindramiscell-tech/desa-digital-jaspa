import { SetelanForm } from '@/components/admin/SetelanForm';
import { getSetelan, seedSetelan } from '@/lib/setelan';

export const revalidate = 0;

export default async function AdminSetelanPage() {
  await seedSetelan(); // Ensure data exists before rendering form
  const data = await getSetelan();

  return (
      <SetelanForm dataAwal={data} />
  );
}
