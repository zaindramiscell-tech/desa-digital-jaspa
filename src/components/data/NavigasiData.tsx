
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building, Goal } from 'lucide-react';

const navLinks = [
  { href: '/data/demografi', label: 'Data Demografi', icon: Users },
  { href: '/data/idm', label: 'Indeks Desa Membangun', icon: Building },
  { href: '/data/sdgs', label: 'SDGs Desa', icon: Goal },
];

export function NavigasiData() {
  const pathname = usePathname();

  return (
    <Card className="sticky top-20">
      <CardContent className="p-4">
        <h3 className="text-lg font-headline font-semibold mb-4 px-2">Kategori Data</h3>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={pathname === link.href ? 'secondary' : 'ghost'}
              className="justify-start"
            >
              <Link href={link.href}>
                <link.icon className="mr-3 h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
