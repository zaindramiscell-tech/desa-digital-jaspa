
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DataIDM, updateDataIDM } from '@/lib/idm';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  iks: z.coerce.number().min(0, "Nilai tidak boleh negatif").max(1, "Nilai maksimal adalah 1"),
  ike: z.coerce.number().min(0, "Nilai tidak boleh negatif").max(1, "Nilai maksimal adalah 1"),
  ikl: z.coerce.number().min(0, "Nilai tidak boleh negatif").max(1, "Nilai maksimal adalah 1"),
});

type FormData = z.infer<typeof formSchema>;

interface IdmFormProps {
  dataAwal: DataIDM;
}

export function IdmForm({ dataAwal }: IdmFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iks: dataAwal?.iks || 0,
      ike: dataAwal?.ike || 0,
      ikl: dataAwal?.ikl || 0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await updateDataIDM(data);
      
      toast({ title: "Berhasil", description: "Data IDM telah diperbarui." });
      router.refresh(); 

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Data IDM</CardTitle>
        <CardDescription>Perbarui skor Indeks Ketahanan Sosial (IKS), Ekonomi (IKE), dan Lingkungan (IKL). Skor IDM dan Status akan dihitung secara otomatis.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="iks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skor IKS (Sosial)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.0001" placeholder="0.0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ike"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skor IKE (Ekonomi)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.0001" placeholder="0.0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ikl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skor IKL (Lingkungan)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.0001" placeholder="0.0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-lg">Hasil Kalkulasi</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-8">
                   <div>
                       <FormLabel>Skor IDM</FormLabel>
                       <p className="text-2xl font-bold">{dataAwal.idm}</p>
                   </div>
                    <div>
                       <FormLabel>Status Desa</FormLabel>
                        <div className="mt-1">
                          <Badge className="text-base">{dataAwal.status}</Badge>
                        </div>
                   </div>
                </CardContent>
             </Card>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
