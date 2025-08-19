import { getBeritaById, BeritaClient } from '@/lib/berita';
import { BeritaForm } from '@/components/admin/BeritaForm';

export const revalidate = 0;

export default async function EditBeritaPage({ params }: { params: { id: string } }) {
  const beritaServer = await getBeritaById(params.id);

  if (!beritaServer) {
    return <div className="container mx-auto py-10">Berita tidak ditemukan.</div>;
  }

  // Convert server data to client-safe data
  const beritaClient: BeritaClient = {
    ...beritaServer,
    tanggalPublikasi: beritaServer.tanggalPublikasi.toDate().toISOString(),
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <BeritaForm berita={beritaClient} />
    </div>
  );
}
