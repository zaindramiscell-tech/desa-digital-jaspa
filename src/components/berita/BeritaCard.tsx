
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { type BeritaClient } from '@/lib/berita';

interface BeritaCardProps {
  berita: BeritaClient;
}

function getFirstParagraph(content: any): string {
    if (typeof content === 'string') {
        return content.substring(0, 100) + '...';
    }
    if (content && content.blocks) {
        const firstParagraph = content.blocks.find((block: any) => block.type === 'paragraph');
        if (firstParagraph) {
            return firstParagraph.data.text.substring(0, 100) + '...';
        }
    }
    return 'Baca selengkapnya...';
}

export function BeritaCard({ berita }: BeritaCardProps) {
  const ringkasan = getFirstParagraph(berita.isi);
  
  // To prevent hydration mismatch, ensure date formatting is consistent
  // between server and client by using a specific timezone like UTC.
  const date = new Date(berita.tanggalPublikasi);
  const tanggal = new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-2">
      <CardHeader className="p-0">
        <Link href={`/berita/${berita.id}`} className="block relative w-full h-48 overflow-hidden">
          <Image
            src={berita.gambarUrl || 'https://placehold.co/400x300.png'}
            alt={berita.judul}
            fill
            style={{objectFit: 'cover'}}
            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="news article"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center text-xs text-muted-foreground mb-2">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            <span>{tanggal}</span>
        </div>
        <Link href={`/berita/${berita.id}`} className="hover:text-primary transition-colors">
          <CardTitle className="font-headline mb-2 text-lg leading-tight">{berita.judul}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mt-2">{ringkasan}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Button asChild variant="link" className="p-0 text-primary hover:text-accent-foreground">
          <Link href={`/berita/${berita.id}`}>
            Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
