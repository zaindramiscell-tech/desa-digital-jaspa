import { getSemuaBerita, Berita } from '@/lib/berita';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle } from 'lucide-react';
import { BeritaActions } from '@/components/admin/BeritaActions';

export const revalidate = 0; 

export default async function AdminBeritaPage() {
  const daftarBerita = await getSemuaBerita();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Berita</CardTitle>
          <Button asChild>
            <Link href="/admin/berita/tambah">
              <PlusCircle className="mr-2 h-4 w-4" /> Tambah Berita
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Judul</TableHead>
                <TableHead>Tanggal Publikasi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {daftarBerita.length > 0 ? (
                daftarBerita.map((berita) => (
                  <TableRow key={berita.id}>
                    <TableCell className="font-medium">{berita.judul}</TableCell>
                    <TableCell>
                      {berita.tanggalPublikasi.toDate().toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <BeritaActions beritaId={berita.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Tidak ada berita.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
