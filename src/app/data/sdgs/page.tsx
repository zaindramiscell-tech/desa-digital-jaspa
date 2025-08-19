
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getAllSDGs, SDG } from '@/lib/sdgs';
import { sdgIcons } from '@/components/data/SdgIcons';

export const revalidate = 0;

export default async function SdgsPage() {
    const data = await getAllSDGs();

    return (
        <>
            <section className="mb-12">
                <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">
                    SDGs Desa
                </h1>
                <p className="text-lg text-muted-foreground">
                    Capaian 18 Tujuan Pembangunan Berkelanjutan tingkat desa.
                </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((sdg, index) => {
                    const Icon = sdgIcons[index] || sdgIcons[sdgIcons.length - 1]; // Fallback icon
                    return (
                        <Card key={sdg.id} className="shadow-lg flex flex-col">
                            <CardHeader>
                               <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <CardDescription>SDG #{index + 1}</CardDescription>
                                        <CardTitle className="text-lg leading-tight mt-1">{sdg.nama}</CardTitle>
                                    </div>
                               </div>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-end">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-muted-foreground">Capaian</span>
                                    <span className="text-sm font-bold text-primary">{sdg.skor}%</span>
                                </div>
                                <Progress value={sdg.skor} aria-label={`Capaian ${sdg.nama} ${sdg.skor}%`}/>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </>
    );
}
