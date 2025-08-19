
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Newspaper, BarChart3, Mountain, UserSquare, LogOut, Settings, LayoutDashboard, ChevronDown, ChevronRight, Goal, Building, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase/config";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const navLinks = [
  { href: "/admin/berita", label: "Manajemen Berita", icon: Newspaper },
  { 
    label: "Manajemen Data", 
    icon: BarChart3,
    subLinks: [
      { href: "/admin/data/demografi", label: "Data Demografi", icon: Users },
      { href: "/admin/data/idm", label: "Data IDM", icon: Building },
      { href: "/admin/data/sdgs", label: "Data SDGs", icon: Goal },
    ]
  },
  { href: "/admin/profil", label: "Manajemen Profil", icon: UserSquare },
  { href: "/admin/setelan", label: "Setelan Website", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [openCollapsible, setOpenCollapsible] = useState(pathname.startsWith('/admin/data'));


  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Berhasil", description: "Anda telah keluar." });
      router.push('/');
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Terjadi kesalahan saat keluar.",
      });
    }
  };

  const SidebarContent = () => (
     <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="">Desa Digital</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link) => (
              link.subLinks ? (
                 <Collapsible key={link.label} open={openCollapsible} onOpenChange={setOpenCollapsible}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                     <div className="flex items-center gap-3">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </div>
                    {openCollapsible ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6">
                     <nav className="grid items-start px-2 text-sm font-medium lg:px-4 border-l ml-1.5">
                      {link.subLinks.map(subLink => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            (pathname === subLink.href) && "bg-muted text-primary"
                          )}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </nav>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    (pathname.startsWith(link.href)) && "bg-muted text-primary"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
        </div>
      </div>
  );


  return (
    <>
      <aside className="hidden border-r bg-background md:block md:w-64">
        <SidebarContent />
      </aside>
       <header className="md:hidden flex h-14 items-center gap-4 border-b bg-muted/40 px-6 fixed top-0 left-0 right-0 z-40 bg-background">
         <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-64">
               <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
      </header>
       <div className="md:hidden h-14" />
    </>
  );
}
