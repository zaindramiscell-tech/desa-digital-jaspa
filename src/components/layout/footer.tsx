import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSetelan } from "@/lib/setelan";

export async function Footer() {
  const setelan = await getSetelan();

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold font-headline mb-4">{setelan.namaDesa}</h3>
            <p className="max-w-md">
              {setelan.deskripsiSitus}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold font-headline mb-4">Kontak Kami</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span>{setelan.kontak.alamat}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 shrink-0" />
                <span>{setelan.kontak.telepon}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 shrink-0" />
                <span>{setelan.kontak.email}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold font-headline mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <Button asChild variant="ghost" size="icon" className="hover:bg-primary/20">
                <Link href="#" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hover:bg-primary/20">
                <Link href="#" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hover:bg-primary/20">
                <Link href="#" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {setelan.namaDesa}. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
