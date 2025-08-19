
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type BeritaClient } from '@/lib/berita';

interface BeritaCardProps {
  berita: BeritaClient;
}

export function BeritaCard({ berita }: BeritaCardProps) {
  const ringkasan = berita.isi.substring(0, 100) + '...';

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group">
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
        <Link href={`/berita/${berita.id}`} className="hover:text-primary transition-colors">
          <CardTitle className="font-headline mb-2 text-lg">{berita.judul}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mt-2">{ringkasan}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Button asChild variant="link" className="p-0 text-primary hover:text-accent">
          <Link href={`/berita/${berita.id}`}>
            Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
