import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, Target, BookText } from "lucide-react";
import Image from "next/image";
import { getProfilDesa } from "@/lib/profilDesa";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Profil Desa',
}

export const revalidate = 0;

export default async function ProfilDesaPage() {
  const profil = await getProfilDesa();

  return (
    <>
      <section className="relative h-64 w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1599691535593-b3e364734a74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Balai Desa"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="village hall"
          priority
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
          
          <article>
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <BookText className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-headline font-semibold">Sejarah Desa</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed prose lg:prose-xl max-w-none">
                <p>
                  {profil.sejarah}
                </p>
              </CardContent>
            </Card>
          </article>

          <div className="grid md:grid-cols-2 gap-12">
            <section>
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-headline font-semibold">Visi</h2>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  <p>
                    “{profil.visi}”
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-headline font-semibold">Misi</h2>
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
            </section>
          </div>

        </div>
      </div>
    </>
  );
}
