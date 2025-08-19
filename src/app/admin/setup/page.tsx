// THIS IS A DEV-ONLY ROUTE TO SEED THE DATABASE
// Access it by navigating to /admin/setup

import { seedBerita } from '@/lib/berita';
import { getDataDemografi } from '@/lib/dataDesa';
import { getDataIDM } from '@/lib/idm';
import { getProfilDesa } from '@/lib/profilDesa';
import { getAllSDGs } from '@/lib/sdgs';
import { seedSetelan } from '@/lib/setelan';
import Link from 'next/link';

async function seedDatabase() {
  'use server';
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
    return { success: true, message: 'Database seeding complete!' };
  } catch (error) {
    console.error('Database seeding failed:', error);
    return { success: false, message: 'Database seeding failed.' };
  }
}

export default async function SeedPage() {
  const result = await seedDatabase();

  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold">Database Seeding</h1>
      {result.success ? (
        <p className="mt-4 text-green-600">{result.message}</p>
      ) : (
        <p className="mt-4 text-red-600">{result.message}</p>
      )}
      <div className="mt-4 text-sm text-muted-foreground max-w-md">
        <p>Halaman ini telah menjalankan fungsi untuk mengisi database Firestore Anda dengan data awal (mock data) untuk semua koleksi, termasuk berita, profil, data desa, dan setelan.</p>
      </div>
      <Link href="/admin/berita" className="mt-8 text-primary hover:underline">
        Go back to Admin
      </Link>
    </div>
  );
}
