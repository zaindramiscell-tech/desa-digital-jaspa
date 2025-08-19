import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, Newspaper } from "lucide-react";
import { getSemuaBerita } from "@/lib/berita";
import { BeritaCard } from "@/components/berita/BeritaCard";

export const revalidate = 0;

export default async function Home() {
  const daftarBerita = (await getSemuaBerita()).slice(0, 3);

  const programs = [
    {
      title: "Desa Cerdas",
      description: "Program digitalisasi layanan desa untuk mempermudah akses informasi dan administrasi bagi warga.",
      icon: <Lightbulb className="w-10 h-10 text-primary" />,
    },
    {
      title: "Gerakan Desa Sehat",
      description: "Meningkatkan kualitas kesehatan masyarakat melalui posyandu, penyuluhan, dan program sanitasi.",
      icon: <Newspaper className="w-10 h-10 text-primary" />,
    },
    {
      title: "Pendidikan Merata",
      description: "Program beasiswa dan bantuan perlengkapan sekolah untuk memastikan semua anak mendapatkan pendidikan.",
      icon: <BookOpen className="w-10 h-10 text-primary" />,
    },
  ];


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1672561924208-7762120e7077?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Pemandangan Desa"
          fill
          style={{objectFit: 'cover'}}
          className="z-0"
          data-ai-hint="village landscape"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="z-20 p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">
            Selamat Datang di Desa Digital
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">
            Menuju desa yang maju, mandiri, dan sejahtera melalui inovasi digital.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-accent">
            <Link href="/profil">Jelajahi Desa <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Berita Terkini Section */}
      <section id="berita" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Berita Terkini</h2>
            <Button asChild variant="outline">
              <Link href="/berita">Lihat Semua Berita <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {daftarBerita.length > 0 ? (
                daftarBerita.map((berita) => (
                    <BeritaCard key={berita.id} berita={{
                      ...berita,
                      tanggalPublikasi: berita.tanggalPublikasi.toDate().toISOString(),
                    }} />
                ))
            ) : (
                <p>Belum ada berita yang dipublikasikan.</p>
            )}
          </div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section id="program" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Program Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {programs.map((program, index) => (
              <Card key={index} className="p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
                <div className="mb-4 p-4 bg-blue-100 rounded-full">
                  {program.icon}
                </div>
                <CardTitle className="font-headline mb-2">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
