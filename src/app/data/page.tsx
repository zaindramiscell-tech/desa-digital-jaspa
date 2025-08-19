import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, User, Home } from 'lucide-react';
import { getDataDemografi } from '@/lib/dataDesa';
import { GrafikBatangJenisKelamin } from '@/components/data/GrafikBatangJenisKelamin';
import { GrafikPieKomposisiUsia } from '@/components/data/GrafikPieKomposisiUsia';
import Image from 'next/image';

export const revalidate = 0; // Revalidate data on every request

export default async function DataPage() {
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
      <section className="relative h-64 w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Visualisasi Data Desa"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
          data-ai-hint="data visualization"
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="z-20 p-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold drop-shadow-lg">
            Data Demografi Desa
          </h1>
          <p className="text-lg md:text-xl mt-2 drop-shadow-md">
            Gambaran umum kondisi kependudukan desa kami.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
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
      </div>
    </>
  );
}
