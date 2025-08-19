import { BeritaForm } from "@/components/admin/BeritaForm";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TambahBeritaPage() {
  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Berita Baru</CardTitle>
          <CardDescription>
            Isi formulir di bawah ini untuk mempublikasikan berita atau informasi baru.
          </CardDescription>
        </CardHeader>
      </Card>
      <BeritaForm berita={null} />
    </div>
  );
}
