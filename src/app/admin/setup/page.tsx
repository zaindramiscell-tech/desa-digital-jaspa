// THIS IS A DEV-ONLY ROUTE TO SEED THE DATABASE
// Access it by navigating to /admin/setup
'use client';

import { useState } from 'react';
import { seedBerita } from '@/lib/berita';
import { getDataDemografi } from '@/lib/dataDesa';
import { getDataIDM } from '@/lib/idm';
import { getProfilDesa } from '@/lib/profilDesa';
import { getAllSDGs } from '@/lib/sdgs';
import { seedSetelan } from '@/lib/setelan';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

async function seedDatabase() {
  console.log('Seeding database...');
  try {
    await Promise.all([
      seedBerita(),
      getDataDemografi(), // Seeds if not exists
      getDataIDM(),       // Seeds if not exists
      getProfilDesa(),    // Seeds if not exists
      getAllSDGs(),       // Seeds if not exists
      seedSetelan(),      // Seeds if not exists
    ]);
    console.log('Database seeding complete!');
    return { success: true, message: 'Database berhasil diisi dengan data awal!' };
  } catch (error) {
    console.error('Database seeding failed:', error);
    // Casting error to any to access message property
    const err = error as any;
    const errorMessage = err.message || 'Terjadi kesalahan tidak diketahui.';
    return { success: false, message: `Database seeding gagal: ${errorMessage}` };
  }
}

export default function SeedPage() {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSeed = async () => {
    setIsLoading(true);
    setResult(null);
    const seedResult = await seedDatabase();
    setResult(seedResult);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Database Seeding</CardTitle>
          <CardDescription>
            Klik tombol di bawah untuk mengisi database Firestore Anda dengan data contoh (mock data) untuk semua koleksi. Ini hanya perlu dilakukan sekali saat pertama kali menyiapkan proyek.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSeed} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Memproses...' : 'Mulai Seeding Data'}
          </Button>

          {result && (
            <div className="mt-6 p-4 rounded-md text-left" style={{ backgroundColor: result.success ? 'hsl(var(--secondary))' : 'hsl(var(--destructive)/0.2)' }}>
              <h4 className="font-semibold" style={{ color: result.success ? 'hsl(var(--foreground))' : 'hsl(var(--destructive-foreground))' }}>
                {result.success ? 'Berhasil' : 'Gagal'}
              </h4>
              <p className="text-sm" style={{ color: result.success ? 'hsl(var(--muted-foreground))' : 'hsl(var(--destructive-foreground))' }}>
                {result.message}
              </p>
            </div>
          )}
          <Link href="/admin/berita" className="mt-8 inline-block text-sm text-primary hover:underline">
            Kembali ke Panel Admin
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
