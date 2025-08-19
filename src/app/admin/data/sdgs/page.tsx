
import { SdgsForm } from '@/components/admin/SdgsForm';
import { getAllSDGs } from '@/lib/sdgs';

export const revalidate = 0;

export default async function AdminSdgsPage() {
  const data = await getAllSDGs();

  return (
      <SdgsForm dataAwal={data} />
  );
}
