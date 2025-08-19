
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BeritaClient, BeritaTulis, tambahBerita, updateBerita } from '@/lib/berita';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Loader2, Upload, Link2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from './Editor';
import { OutputData } from '@editorjs/editorjs';


const formSchema = z.object({
  judul: z.string().min(5, { message: "Judul harus memiliki setidaknya 5 karakter." }),
  isi: z.any().refine((data: OutputData) => {
    return data && Array.isArray(data.blocks) && data.blocks.length > 0;
  }, { message: "Isi berita tidak boleh kosong." }),
  gambarUrl: z.string().optional().or(z.literal('')),
  gambar: z.any().optional(),
});


type FormValues = z.infer<typeof formSchema>;

interface BeritaFormProps {
  berita?: BeritaClient | null;
}

const transformGoogleDriveUrl = (url: string): string => {
    if (url.includes('drive.google.com/file/d/')) {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');
            const fileId = pathParts[pathParts.indexOf('d') + 1];
            if (fileId) {
                return `https://drive.google.com/uc?export=view&id=${fileId}`;
            }
        } catch (error) {
            console.error("Invalid URL for Google Drive conversion", error);
            return url; // Return original url if parsing fails
        }
    }
    return url;
};


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
      isi: berita?.isi || { blocks: [] },
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
  const fileValue = form.watch('gambar');

  useEffect(() => {
    if (imageSource === 'url' && urlValue) {
        const transformedUrl = transformGoogleDriveUrl(urlValue);
        setPreview(transformedUrl);
        form.setValue('gambar', null); // Clear file input if URL is being used
    } else if (imageSource === 'upload' && fileValue instanceof File) {
       setPreview(URL.createObjectURL(fileValue));
       form.setValue('gambarUrl', ''); // Clear URL input if file is being used
    } else if (imageSource === 'url' && !urlValue) {
       setPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlValue, fileValue, imageSource]);


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const isEditMode = berita && berita.id;
      let beritaData: BeritaTulis;

      if (!data.gambar && !data.gambarUrl && !berita?.gambarUrl) {
           form.setError('gambar', { type: 'manual', message: 'Anda harus mengunggah gambar atau menyediakan URL.' });
           setIsSubmitting(false);
           return;
      }
      
      const finalGambarUrl = data.gambarUrl ? transformGoogleDriveUrl(data.gambarUrl) : '';

      if (imageSource === 'url') {
        beritaData = {
          judul: data.judul,
          isi: data.isi,
          gambarUrl: finalGambarUrl,
          gambar: null,
        };
      } else {
        beritaData = {
          judul: data.judul,
          isi: data.isi,
          gambar: data.gambar || null,
          gambarUrl: null, // Ensure URL is null when uploading
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
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Gagal",
        description: error.message || "Terjadi kesalahan saat menyimpan berita.",
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
                    <div className="mt-2 w-full">
                       <Editor 
                          data={field.value} 
                          onChange={(data) => field.onChange(data)} 
                          holder="editorjs-container"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>Gambar Berita</FormLabel>
              <Tabs value={imageSource} onValueChange={(value) => {
                  const newSource = value as 'upload' | 'url';
                  setImageSource(newSource);
                  if (newSource === 'upload') {
                      form.setValue('gambarUrl', '');
                      setPreview(berita?.gambarUrl && berita.gambarUrl.includes('firebasestorage') ? berita.gambarUrl : null);
                  } else {
                      form.setValue('gambar', null);
                      setPreview(berita?.gambarUrl && !berita.gambarUrl.includes('firebasestorage') ? berita.gambarUrl : null);
                  }
              }}>
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
                            placeholder="https://drive.google.com/file/d/..."
                            {...field}
                            disabled={imageSource !== 'url'}
                            onChange={(e) => {
                                field.onChange(e);
                                const transformedUrl = transformGoogleDriveUrl(e.target.value);
                                setPreview(transformedUrl);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Tempelkan tautan dari Google Drive. Tautan akan dikonversi otomatis.
                        </FormDescription>
                         <FormMessage />
                      </FormItem>
                    )}
                    />
                </TabsContent>
              </Tabs>
               {form.formState.errors.gambar && <p className="text-sm font-medium text-destructive">{form.formState.errors.gambar.message?.toString()}</p>}
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
