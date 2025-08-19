
"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This page just redirects to the first sub-item
export default function AdminDataPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/data/demografi');
  }, [router]);

  return null;
}
