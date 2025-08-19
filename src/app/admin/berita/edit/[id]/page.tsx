import { getBeritaById } from '@/lib/berita';
import { BeritaForm } from '@/components/admin/BeritaForm';

export const revalidate = 0;

export default async function EditBeritaPage({ params }: { params: { id: string } }) {
  const berita = await getBeritaById(params.id);

  if (!berita) {
    return <div className="container mx-auto py-10">Berita tidak ditemukan.</div>;
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <BeritaForm berita={berita} />
    </div>
  );
}
