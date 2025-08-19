'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Berita } from '@/lib/berita';

interface BeritaCardProps {
  berita: Berita;
}

export function BeritaCard({ berita }: BeritaCardProps) {
  const ringkasan = berita.isi.substring(0, 100) + '...';

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={berita.gambarUrl || 'https://placehold.co/400x300.png'}
            alt={berita.judul}
            fill
            style={{objectFit: 'cover'}}
            className="w-full h-full"
            data-ai-hint="news article"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline mb-2 text-lg">{berita.judul}</CardTitle>
        <p className="text-sm text-muted-foreground">{ringkasan}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="link" className="p-0 text-primary hover:text-accent">
          <Link href={`/berita/${berita.id}`}>
            Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
