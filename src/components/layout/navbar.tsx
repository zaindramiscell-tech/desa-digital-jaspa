
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain, ChevronDown } from "lucide-react";
import { usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/lib/firebase/config";
import { getSetelan } from "@/lib/setelan";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const [namaDesa, setNamaDesa] = useState("Desa Digital");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
     // Fetch settings on client side to avoid making Navbar a server component
    async function fetchSetelan() {
        const setelan = await getSetelan();
        setNamaDesa(setelan.namaDesa);
    }
    fetchSetelan();

    return () => unsubscribe();
  }, [auth]);

  // Hide navbar on admin, login, and register routes
  if (pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register') {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil Desa" },
    { href: "/berita", label: "Berita" },
    { href: "/#program", label: "Program Kerja" },
  ];

  const dataLinks = [
    { href: "/data/demografi", label: "Data Demografi" },
    { href: "/data/idm", label: "Indeks Desa Membangun" },
    { href: "/data/sdgs", label: "SDGs Desa" },
  ];

  const adminLink = user ? { href: "/admin/berita", label: "Admin" } : { href: "/login", label: "Login"};

  const allLinks = [...navLinks, adminLink];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="text-foreground">{namaDesa}</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary p-2">
                Data Desa
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dataLinks.map(link => (
                 <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
           <Link href={adminLink.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {adminLink.label}
            </Link>
           <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                <SheetDescription className="sr-only">Pilih tautan untuk menavigasi situs.</SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="text-foreground">{namaDesa}</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                 <h4 className="font-semibold mt-2">Data Desa</h4>
                {dataLinks.map((link) => (
                   <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-4"/>
                 <Link
                    href={adminLink.href}
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {adminLink.label}
                  </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
