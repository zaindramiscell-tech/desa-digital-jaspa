import { DataForm } from '@/components/admin/DataForm';
import { getDataDemografi } from '@/lib/dataDesa';

export const revalidate = 0;

export default async function AdminDataPage() {
  const data = await getDataDemografi();

  if (!data) {
    return <div className="container mx-auto py-10">Gagal memuat data.</div>;
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <DataForm dataAwal={data} />
    </div>
  );
}
