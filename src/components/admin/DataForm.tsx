"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DataDemografi, updateDataDemografi } from '@/lib/dataDesa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  totalPenduduk: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  jumlahPria: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  jumlahWanita: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  jumlahKK: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  usia_0_17: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  usia_18_55: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
  usia_55_plus: z.coerce.number().min(0, "Jumlah tidak boleh negatif"),
});

type FormData = z.infer<typeof formSchema>;

interface DataFormProps {
  dataAwal: DataDemografi;
}

export function DataForm({ dataAwal }: DataFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalPenduduk: dataAwal?.totalPenduduk || 0,
      jumlahPria: dataAwal?.jumlahPria || 0,
      jumlahWanita: dataAwal?.jumlahWanita || 0,
      jumlahKK: dataAwal?.jumlahKK || 0,
      usia_0_17: dataAwal?.komposisiUsia['0-17'] || 0,
      usia_18_55: dataAwal?.komposisiUsia['18-55'] || 0,
      usia_55_plus: dataAwal?.komposisiUsia['55+'] || 0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const dataToUpdate: DataDemografi = {
        totalPenduduk: data.totalPenduduk,
        jumlahPria: data.jumlahPria,
        jumlahWanita: data.jumlahWanita,
        jumlahKK: data.jumlahKK,
        komposisiUsia: {
          '0-17': data.usia_0_17,
          '18-55': data.usia_18_55,
          '55+': data.usia_55_plus,
        },
      };

      await updateDataDemografi(dataToUpdate);
      
      toast({ title: "Berhasil", description: "Data demografi telah diperbarui." });
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
        <CardTitle>Manajemen Data Demografi</CardTitle>
        <CardDescription>Perbarui data kependudukan desa melalui formulir di bawah ini.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="totalPenduduk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Penduduk</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jumlahKK"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Kepala Keluarga (KK)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jumlahPria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Pria</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jumlahWanita"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Wanita</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card>
              <CardHeader>
                  <CardTitle className="text-lg">Komposisi Usia</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                      control={form.control}
                      name="usia_0_17"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Usia 0-17</FormLabel>
                              <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="usia_18_55"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Usia 18-55</FormLabel>
                              <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="usia_55_plus"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Usia 55+</FormLabel>
                              <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
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
