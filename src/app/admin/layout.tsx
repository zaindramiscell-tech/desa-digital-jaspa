
'use client';

import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase/config';
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


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getAuth(app);
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const generateBreadcrumbs = () => {
    const pathParts = pathname.split('/').filter(part => part);
    // Remove 'admin' part
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

  if (!user) {
    return null; // The redirect is handled in the effect, this prevents flicker
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
