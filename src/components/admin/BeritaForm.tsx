
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BeritaClient, BeritaTulis, tambahBerita, updateBerita } from '@/lib/berita';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Loader2, Upload, Link2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  judul: z.string().min(5, { message: "Judul harus memiliki setidaknya 5 karakter." }),
  isi: z.string().min(20, { message: "Isi berita harus memiliki setidaknya 20 karakter." }),
  gambarUrl: z.string().optional().or(z.literal('')),
  gambar: z.any().optional(),
});


type FormValues = z.infer<typeof formSchema>;

interface BeritaFormProps {
  berita?: BeritaClient | null;
}

export function BeritaForm({ berita }: BeritaFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(berita?.gambarUrl || null);
  const [imageSource, setImageSource] = useState<'upload' | 'url'>(berita?.gambarUrl && !berita.gambarUrl.includes('firebasestorage') ? 'url' : 'upload');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: berita?.judul || '',
      isi: berita?.isi || '',
      gambarUrl: berita?.gambarUrl && !berita.gambarUrl.includes('firebasestorage') ? berita.gambarUrl : '',
      gambar: null,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue('gambar', file);
      form.setValue('gambarUrl', ''); // Clear URL field if file is selected
    }
  };
  
  const urlValue = form.watch('gambarUrl');

  useEffect(() => {
    if (imageSource === 'url' && urlValue) {
        // We only show preview for uploaded files or existing firebase storage urls
        // to avoid crashes with unsupported URLs (like Google Photos).
        if (urlValue.startsWith('blob:') || urlValue.includes('firebasestorage')) {
          setPreview(urlValue);
        } else {
          setPreview(null);
        }
        form.setValue('gambar', null);
    } else if (imageSource === 'upload') {
       const file = form.getValues('gambar');
       if (file) {
         setPreview(URL.createObjectURL(file));
       } else if(berita?.gambarUrl) {
         setPreview(berita.gambarUrl);
       } else {
         setPreview(null);
       }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlValue, imageSource, form]);


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const isEditMode = berita && berita.id;

      let beritaData: BeritaTulis;
      
      if (imageSource === 'url') {
        if (!data.gambarUrl && !isEditMode) {
            form.setError('gambarUrl', { type: 'manual', message: 'URL Gambar atau file unggahan harus diisi.' });
            setIsSubmitting(false);
            return;
        }
        beritaData = {
          judul: data.judul,
          isi: data.isi,
          gambarUrl: data.gambarUrl,
          gambar: null,
        };
      } else {
         if (!data.gambar && !isEditMode) {
            form.setError('gambar', { type: 'manual', message: 'File unggahan atau URL Gambar harus diisi.' });
            setIsSubmitting(false);
            return;
        }
        beritaData = {
          judul: data.judul,
          isi: data.isi,
          gambar: data.gambar || null,
        };
      }

      if (isEditMode) {
        await updateBerita(berita.id, beritaData, berita.gambarUrl);
        toast({ title: "Berhasil", description: "Berita telah berhasil diperbarui." });
      } else {
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
              <Tabs value={imageSource} onValueChange={(value) => setImageSource(value as 'upload' | 'url')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4" /> Unggah File</TabsTrigger>
                  <TabsTrigger value="url"><Link2 className="mr-2 h-4 w-4" /> Gunakan URL</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="pt-4">
                   <FormField
                    control={form.control}
                    name="gambar"
                    render={({ field }) => (
                       <FormItem>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={handleImageChange} disabled={imageSource !== 'upload'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="url" className="pt-4">
                   <FormField
                    control={form.control}
                    name="gambarUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            {...field}
                            disabled={imageSource !== 'url'}
                          />
                        </FormControl>
                        <FormDescription>
                          Gunakan tautan gambar langsung (diakhiri .jpg, .png, dll). Tautan dari Google Photos tidak didukung.
                        </FormDescription>
                         <FormMessage />
                      </FormItem>
                    )}
                    />
                </TabsContent>
              </Tabs>
            </FormItem>

            {preview && (
              <div className="mt-4">
                  <FormLabel>Pratinjau Gambar</FormLabel>
                <div className="relative w-full max-w-sm h-48 mt-2 rounded-md border overflow-hidden">
                    <Image src={preview} alt="Preview" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            )}

            <Button type="submit" disabled={isSubmitting}>
               {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Menyimpan...' : (berita ? 'Simpan Perubahan' : 'Publikasikan Berita')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
