
"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DataRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/data/demografi');
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p>Mengarahkan...</p>
    </div>
  );
}
