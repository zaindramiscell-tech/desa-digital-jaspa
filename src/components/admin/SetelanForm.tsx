"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Setelan, updateSetelan } from '@/lib/setelan';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  namaDesa: z.string().min(3, "Nama desa minimal 3 karakter."),
  deskripsiSitus: z.string().min(10, "Deskripsi situs minimal 10 karakter."),
  alamat: z.string().min(10, "Alamat minimal 10 karakter."),
  kecamatan: z.string().min(3, "Kecamatan minimal 3 karakter."),
  kabupaten: z.string().min(3, "Kabupaten minimal 3 karakter."),
  provinsi: z.string().min(3, "Provinsi minimal 3 karakter."),
  telepon: z.string().min(9, "Nomor telepon minimal 9 karakter."),
  email: z.string().email("Format email tidak valid."),
});

type FormData = z.infer<typeof formSchema>;

interface SetelanFormProps {
  dataAwal: Setelan;
}

export function SetelanForm({ dataAwal }: SetelanFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaDesa: dataAwal?.namaDesa || '',
      deskripsiSitus: dataAwal?.deskripsiSitus || '',
      alamat: dataAwal?.kontak?.alamat || '',
      kecamatan: dataAwal?.kontak?.kecamatan || '',
      kabupaten: dataAwal?.kontak?.kabupaten || '',
      provinsi: dataAwal?.kontak?.provinsi || '',
      telepon: dataAwal?.kontak?.telepon || '',
      email: dataAwal?.kontak?.email || '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const dataToUpdate: Setelan = {
        namaDesa: data.namaDesa,
        deskripsiSitus: data.deskripsiSitus,
        kontak: {
            alamat: data.alamat,
            kecamatan: data.kecamatan,
            kabupaten: data.kabupaten,
            provinsi: data.provinsi,
            telepon: data.telepon,
            email: data.email,
        }
      };

      await updateSetelan(dataToUpdate);
      
      toast({ title: "Berhasil", description: "Setelan website telah diperbarui." });
      router.refresh(); 

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan setelan.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Setelan Website</CardTitle>
        <CardDescription>Ubah informasi umum yang ditampilkan di seluruh situs Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="namaDesa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Desa</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Desa Konoha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deskripsiSitus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Singkat Situs</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Jelaskan secara singkat tentang situs ini..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg'>Informasi Kontak</CardTitle>
                    <CardDescription>Kontak ini akan ditampilkan di footer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Alamat Jalan</FormLabel>
                        <FormControl>
                            <Input placeholder="Jl. Raya Desa No. 1" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                        control={form.control}
                        name="kecamatan"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Kecamatan</FormLabel>
                            <FormControl>
                                <Input placeholder="Kec. Digital" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="kabupaten"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Kabupaten/Kota</FormLabel>
                            <FormControl>
                                <Input placeholder="Kab. Cerdas" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="provinsi"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Provinsi</FormLabel>
                            <FormControl>
                                <Input placeholder="Prov. Teknologi" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <FormField
                        control={form.control}
                        name="telepon"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nomor Telepon</FormLabel>
                            <FormControl>
                                <Input placeholder="(021) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Alamat Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="kontak@desadigital.id" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
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
