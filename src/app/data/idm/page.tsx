
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDataIDM } from '@/lib/idm';
import { IdmRadarChart } from '@/components/data/IdmRadarChart';
import { Building, Shield, Coins, Leaf } from 'lucide-react';

export const revalidate = 0;

function getStatusVariant(status: string) {  
  switch (status.toLowerCase()) {
    case 'mandiri': return 'success';
    case 'maju': return 'default';
    case 'berkembang': return 'secondary';
    case 'tertinggal': return 'destructive';
    case 'sangat tertinggal': return 'destructive';
    default: return 'outline';
  }
}

export default async function IdmPage() {
  const data = await getDataIDM();

  if (!data) {
    return <div>Data Indeks Desa Membangun tidak ditemukan.</div>;
  }
  
  const chartData = [
    { subject: 'IKS', value: data.iks * 100, fullMark: 100 },
    { subject: 'IKE', value: data.ike * 100, fullMark: 100 },
    { subject: 'IKL', value: data.ikl * 100, fullMark: 100 },
  ];

  return (
    <>
        <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">
                Indeks Desa Membangun (IDM)
            </h1>
            <p className="text-lg text-muted-foreground">
                Potret pembangunan desa melalui Indeks Ketahanan Sosial, Ekonomi, dan Lingkungan.
            </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="shadow-lg col-span-1 md:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <span>Status IDM</span>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <Badge variant={getStatusVariant(data.status) as any} className="text-lg mb-2">{data.status}</Badge>
                    <div className="text-3xl font-bold">{data.idm}</div>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                       <span>IKS (Sosial)</span>
                       <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{data.iks}</div>
                    <p className="text-xs text-muted-foreground">Indeks Ketahanan Sosial</p>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                       <span>IKE (Ekonomi)</span>
                       <Coins className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{data.ike}</div>
                    <p className="text-xs text-muted-foreground">Indeks Ketahanan Ekonomi</p>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                       <span>IKL (Lingkungan)</span>
                       <Leaf className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{data.ikl}</div>
                    <p className="text-xs text-muted-foreground">Indeks Ketahanan Lingkungan</p>
                </CardContent>
            </Card>
        </div>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Visualisasi Skor IDM</CardTitle>
                <CardDescription>Grafik radar yang membandingkan skor IKS, IKE, dan IKL.</CardDescription>
            </CardHeader>
            <CardContent>
                <IdmRadarChart data={chartData} />
            </CardContent>
        </Card>
    </>
  );
}

// Extend badge variants in a way that doesn't require modifying the original component
declare module "@/components/ui/badge" {
    interface BadgeProps {
        variant: "default" | "secondary" | "destructive" | "outline" | "success";
    }
}
