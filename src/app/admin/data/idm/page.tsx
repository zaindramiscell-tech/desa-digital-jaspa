
import { IdmForm } from '@/components/admin/IdmForm';
import { getDataIDM } from '@/lib/idm';

export const revalidate = 0;

export default async function AdminIdmPage() {
  const data = await getDataIDM();

  return (
      <IdmForm dataAwal={data} />
  );
}
