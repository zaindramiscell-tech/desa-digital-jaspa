import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, Newspaper } from "lucide-react";

export default function Home() {
  const news = [
    {
      id: "1",
      title: "Musyawarah Desa Membahas Pembangunan Infrastruktur",
      description: "Warga desa antusias mengikuti musyawarah untuk rencana pembangunan jalan dan irigasi baru.",
      image: "https://placehold.co/400x300.png",
      aiHint: "community meeting",
    },
    {
      id: "2",
      title: "Pelatihan UMKM Digital untuk Ibu-Ibu PKK",
      description: "Inisiatif baru untuk meningkatkan keterampilan digital dan pemasaran online bagi para pelaku UMKM di desa.",
      image: "https://placehold.co/400x300.png",
      aiHint: "digital training",
    },
    {
      id: "3",
      title: "Kerja Bakti Membersihkan Lingkungan Desa",
      description: "Semangat gotong royong warga dalam menjaga kebersihan dan keindahan lingkungan desa.",
      image: "https://placehold.co/400x300.png",
      aiHint: "community service",
    },
  ];

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
          src="https://placehold.co/1200x600.png"
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
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="p-0">
                  <Image src={item.image} alt={item.title} width={400} height={300} className="w-full h-48 object-cover" data-ai-hint={item.aiHint} />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline mb-2">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 text-primary hover:text-accent">
                    <Link href={`/berita/${item.id}`}>Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
