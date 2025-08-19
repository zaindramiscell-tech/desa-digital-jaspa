import { getSemuaBerita, Berita } from '@/lib/berita';
import { BeritaCard } from '@/components/berita/BeritaCard';
import Image from 'next/image';

export const revalidate = 0; // Revalidate data on every request

export default async function BeritaPage() {
  const daftarBerita = await getSemuaBerita();

  return (
    <>
      <section className="relative h-64 w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1200x400.png"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarBerita.length > 0 ? (
            daftarBerita.map((berita: Berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))
          ) : (
            <p>Belum ada berita yang dipublikasikan.</p>
          )}
        </div>
      </div>
    </>
  );
}
