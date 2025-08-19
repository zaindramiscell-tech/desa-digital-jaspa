"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Berita, BeritaTulis, tambahBerita, updateBerita } from '@/lib/berita';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

const formSchema = z.object({
  judul: z.string().min(5, { message: "Judul harus memiliki setidaknya 5 karakter." }),
  isi: z.string().min(20, { message: "Isi berita harus memiliki setidaknya 20 karakter." }),
  gambar: z.any().optional(),
});

interface BeritaFormProps {
  berita?: Berita | null;
}

export function BeritaForm({ berita }: BeritaFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(berita?.gambarUrl || null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: berita?.judul || '',
      isi: berita?.isi || '',
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue('gambar', file);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsSubmitting(true);
    try {
      const beritaData: BeritaTulis = {
        judul: data.judul,
        isi: data.isi,
        gambar: data.gambar,
        gambarUrl: berita?.gambarUrl
      };

      if (berita) {
        // Update
        await updateBerita(berita.id, beritaData);
        toast({ title: "Berhasil", description: "Berita telah berhasil diperbarui." });
      } else {
        // Create
        await tambahBerita(beritaData);
        toast({ title: "Berhasil", description: "Berita baru telah berhasil ditambahkan." });
      }
      router.push('/admin/berita');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan berita.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{berita ? 'Edit Berita' : 'Tambah Berita Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Berita</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul berita..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Isi Berita</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tulis isi berita di sini..." className="min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Gambar Berita</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
              </FormControl>
              {preview && (
                <div className="mt-4">
                  <Image src={preview} alt="Preview" width={200} height={150} className="rounded-md object-cover" />
                </div>
              )}
              <FormMessage />
            </FormItem>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : (berita ? 'Simpan Perubahan' : 'Publikasikan Berita')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
