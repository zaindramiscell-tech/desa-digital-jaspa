
'use client';

import { useState, useEffect } from 'react';
import { getSemuaBerita, BeritaClient } from '@/lib/berita';
import { BeritaCard } from '@/components/berita/BeritaCard';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function BeritaPage() {
  const [daftarBerita, setDaftarBerita] = useState<BeritaClient[]>([]);
  const [beritaTampil, setBeritaTampil] = useState<BeritaClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchBerita() {
      setIsLoading(true);
      const beritaDariDb = await getSemuaBerita();
      const beritaClient = beritaDariDb.map(b => ({
        ...b,
        tanggalPublikasi: b.tanggalPublikasi.toDate().toISOString(),
      }));
      setDaftarBerita(beritaClient);
      setBeritaTampil(beritaClient);
      setIsLoading(false);
    }
    fetchBerita();
  }, []);

  useEffect(() => {
    const hasilFilter = daftarBerita.filter(berita =>
      berita.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBeritaTampil(hasilFilter);
  }, [searchTerm, daftarBerita]);

  return (
    <>
      <section className="relative h-64 w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://plus.unsplash.com/premium_photo-1690527101950-5bc2b81ca773?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Berita Desa"
          fill
          style={{objectFit: 'cover'}}
          className="z-0"
          data-ai-hint="news collage"
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="z-20 p-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold drop-shadow-lg">
            Berita & Informasi Desa
          </h1>
          <p className="text-lg md:text-xl mt-2 drop-shadow-md">
            Ikuti perkembangan terbaru dari desa kami.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari berita..."
              className="w-full pl-10 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
           <div className="text-center">Memuat berita...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaTampil.length > 0 ? (
              beritaTampil.map((berita) => (
                <BeritaCard key={berita.id} berita={berita} />
              ))
            ) : (
              <p className="text-center md:col-span-2 lg:col-span-3">
                {searchTerm ? `Tidak ada berita yang cocok dengan "${searchTerm}".` : "Belum ada berita yang dipublikasikan."}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
