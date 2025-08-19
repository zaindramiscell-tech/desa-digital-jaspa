
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, User, Home } from 'lucide-react';
import { getDataDemografi } from '@/lib/dataDesa';
import { GrafikBatangJenisKelamin } from '@/components/data/GrafikBatangJenisKelamin';
import { GrafikPieKomposisiUsia } from '@/components/data/GrafikPieKomposisiUsia';
import Image from 'next/image';

export const revalidate = 0; // Revalidate data on every request

export default async function DataDemografiPage() {
  const data = await getDataDemografi();

  if (!data) {
    return <div>Data tidak ditemukan.</div>;
  }

  const dataKomposisiUsia = Object.entries(data.komposisiUsia).map(([name, value]) => ({ name, value }));
  const dataJenisKelamin = [
    { name: 'Pria', value: data.jumlahPria },
    { name: 'Wanita', value: data.jumlahWanita },
  ];

  return (
    <>
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">
            Data Demografi Desa
        </h1>
        <p className="text-lg text-muted-foreground">
            Gambaran umum kondisi kependudukan desa kami.
        </p>
      </section>

        {/* Kartu Informasi Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Penduduk</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalPenduduk.toLocaleString('id-ID')}</div>
              <p className="text-xs text-muted-foreground">Jiwa</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jumlah Keluarga</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.jumlahKK.toLocaleString('id-ID')}</div>
              <p className="text-xs text-muted-foreground">KK (Kepala Keluarga)</p>
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pria & Wanita</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.jumlahPria.toLocaleString('id-ID')} & {data.jumlahWanita.toLocaleString('id-ID')}</div>
              <p className="text-xs text-muted-foreground">Jumlah Pria & Wanita</p>
            </CardContent>
          </Card>
        </div>

        {/* Visualisasi Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
             <GrafikBatangJenisKelamin data={dataJenisKelamin} />
          </div>
          <div className="lg:col-span-2">
            <GrafikPieKomposisiUsia data={dataKomposisiUsia} />
          </div>
        </div>
    </>
  );
}
