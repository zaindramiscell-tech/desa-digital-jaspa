"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ProfilDesaData, updateProfilDesa } from '@/lib/profilDesa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  sejarah: z.string().min(20, "Sejarah harus memiliki setidaknya 20 karakter."),
  visi: z.string().min(10, "Visi harus memiliki setidaknya 10 karakter."),
  misi: z.string().min(10, "Misi harus memiliki setidaknya 10 karakter."),
});

type FormData = z.infer<typeof formSchema>;

interface ProfilFormProps {
  dataAwal: ProfilDesaData;
}

export function ProfilForm({ dataAwal }: ProfilFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sejarah: dataAwal?.sejarah || '',
      visi: dataAwal?.visi || '',
      misi: dataAwal?.misi?.join('\n') || '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const dataToUpdate: ProfilDesaData = {
        sejarah: data.sejarah,
        visi: data.visi,
        misi: data.misi.split('\n').filter(item => item.trim() !== ''),
      };

      await updateProfilDesa(dataToUpdate);
      
      toast({ title: "Berhasil", description: "Data profil desa telah diperbarui." });
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
        <CardTitle>Manajemen Profil Desa</CardTitle>
        <CardDescription>Perbarui konten halaman profil seperti sejarah, visi, dan misi desa.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="sejarah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sejarah Desa</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tulis sejarah singkat desa..." className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="visi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visi Desa</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan visi desa..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="misi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi Desa</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tulis setiap poin misi dalam satu baris baru..." className="min-h-[150px]" {...field} />
                  </FormControl>
                   <p className="text-xs text-muted-foreground">Tulis setiap poin misi dalam baris baru.</p>
                  <FormMessage />
                </FormItem>
              )}
            />

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
