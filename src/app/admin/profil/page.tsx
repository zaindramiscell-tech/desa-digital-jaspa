import { ProfilForm } from '@/components/admin/ProfilForm';
import { getProfilDesa } from '@/lib/profilDesa';

export const revalidate = 0;

export default async function AdminProfilPage() {
  const data = await getProfilDesa();

  return (
      <ProfilForm dataAwal={data} />
  );
}
