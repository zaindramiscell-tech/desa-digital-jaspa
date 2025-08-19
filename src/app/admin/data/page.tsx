import { DataForm } from '@/components/admin/DataForm';
import { getDataDemografi } from '@/lib/dataDesa';

export const revalidate = 0;

export default async function AdminDataPage() {
  const data = await getDataDemografi();

  return (
      <DataForm dataAwal={data} />
  );
}
