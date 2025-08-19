import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Target, BookText } from "lucide-react";
import Image from "next/image";
import { getProfilDesa } from "@/lib/profilDesa";

export const revalidate = 0;

export default async function ProfilDesa() {
  const profil = await getProfilDesa();

  return (
    <>
      <section className="relative h-64 w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Balai Desa"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="village hall"
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="z-20 p-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold drop-shadow-lg">
            Profil Desa
          </h1>
          <p className="text-lg md:text-xl mt-2 drop-shadow-md">
            Mengenal lebih dekat desa kami.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12">
          
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-headline">Sejarah Desa</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {profil.sejarah}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-headline">Visi</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  “{profil.visi}”
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-100 rounded-full">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-headline">Misi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                  {profil.misi.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </>
  );
}
