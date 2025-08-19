
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SDG, updateSDGSkor } from '@/lib/sdgs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { sdgIcons } from '../data/SdgIcons';

const sdgFormSchema = z.object({
  skor: z.coerce.number().min(0).max(100),
});

const formSchema = z.object({
  sdgs: z.array(z.object({
    id: z.string(),
    nama: z.string(),
    skor: z.coerce.number().min(0, "Skor antara 0-100").max(100, "Skor antara 0-100"),
  })),
});

type FormData = z.infer<typeof formSchema>;

interface SdgsFormProps {
  dataAwal: SDG[];
}

export function SdgsForm({ dataAwal }: SdgsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sdgs: dataAwal || [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "sdgs",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Create a collection of promises
      const updatePromises = data.sdgs.map(sdg => 
        updateSDGSkor(sdg.id, sdg.skor)
      );
      
      // Wait for all updates to complete
      await Promise.all(updatePromises);
      
      toast({ title: "Berhasil", description: "Data SDGs telah diperbarui." });
      router.refresh(); 

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan data SDGs.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Data SDGs Desa</CardTitle>
        <CardDescription>Perbarui skor capaian (0-100) untuk setiap tujuan SDGs di desa Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {fields.map((field, index) => {
                const Icon = sdgIcons[index] || sdgIcons[sdgIcons.length - 1];
                return (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`sdgs.${index}.skor`}
                    render={({ field: formField }) => (
                      <FormItem className="flex flex-col sm:flex-row items-start sm:items-center gap-4 space-y-0 rounded-lg border p-4">
                         <div className="flex items-center gap-4 w-full sm:w-2/3">
                            <Icon className="h-6 w-6 text-primary shrink-0"/>
                            <div>
                                <FormLabel className="text-base">{`#${index + 1}: ${field.nama}`}</FormLabel>
                                <FormMessage className="mt-1" />
                            </div>
                         </div>
                         <div className="w-full sm:w-1/3">
                            <FormControl>
                                <Input type="number" min="0" max="100" placeholder="0-100" {...formField} />
                            </FormControl>
                         </div>
                      </FormItem>
                    )}
                  />
                )
              })}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
