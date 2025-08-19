import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Target, BookText } from "lucide-react";
import Image from "next/image";

export default function ProfilDesa() {
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. 
              </p>
              <p>
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
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
                  “Terwujudnya Desa yang Maju, Mandiri, Sejahtera, dan Berbasis Digital pada Tahun 2030.”
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
                  <li>Meningkatkan kualitas pelayanan publik melalui digitalisasi.</li>
                  <li>Mengembangkan potensi ekonomi lokal dengan dukungan teknologi.</li>
                  <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan.</li>
                  <li>Membangun infrastruktur yang mendukung konektivitas dan kemajuan desa.</li>
                  <li>Mendorong partisipasi aktif masyarakat dalam pembangunan desa.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </>
  );
}
