
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useState, useEffect } from 'react';
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Loader2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getUserProfile } from '@/lib/users';
import { useToast } from '@/hooks/use-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Check user role
        const profile = await getUserProfile(user.uid);
        if (profile?.role === 'admin') {
          setIsAuthorized(true);
        } else {
          toast({
            variant: "destructive",
            title: "Akses Ditolak",
            description: "Anda tidak memiliki izin untuk mengakses halaman ini.",
          });
          router.push('/');
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateBreadcrumbs = () => {
    const pathParts = pathname.split('/').filter(part => part);
    const breadcrumbParts = pathParts.slice(1); 

    if (breadcrumbParts.length === 0) return null;

    return (
      <Breadcrumb className="hidden md:flex mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/berita">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbParts.map((part, index) => {
            const href = `/admin/${breadcrumbParts.slice(0, index + 1).join('/')}`;
            const isLast = index === breadcrumbParts.length - 1;
            const label = part.charAt(0).toUpperCase() + part.slice(1);

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-4 text-lg">Memverifikasi akses...</span>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return null; 
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 bg-muted/40">
        {generateBreadcrumbs()}
        {children}
      </main>
    </div>
  );
}
