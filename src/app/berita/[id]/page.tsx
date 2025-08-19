import { getBeritaById } from '@/lib/berita';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { ShareButtons } from '@/components/berita/ShareButtons';

export const revalidate = 0;

export default async function BeritaDetailPage({ params }: { params: { id: string } }) {
  const berita = await getBeritaById(params.id);

  if (!berita) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Berita tidak ditemukan</h1>
        <p>Maaf, berita yang Anda cari tidak ada atau mungkin telah dihapus.</p>
      </div>
    );
  }

  const tanggal = berita.tanggalPublikasi.toDate().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <article>
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 leading-tight">{berita.judul}</h1>
        <div className="flex items-center text-muted-foreground text-sm mb-6">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Dipublikasikan pada {tanggal}</span>
        </div>
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={berita.gambarUrl || 'https://placehold.co/800x400.png'}
            alt={berita.judul}
            fill
            style={{objectFit: 'cover'}}
            data-ai-hint="news article"
          />
        </div>
        <div className="prose lg:prose-xl max-w-none text-muted-foreground leading-relaxed">
          <p>{berita.isi}</p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <ShareButtons title={berita.judul} />
        </div>
      </article>
    </div>
  );
}
