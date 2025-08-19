"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ChartData {
    name: string;
    value: number;
}

interface GrafikBatangProps {
  data: ChartData[];
}

export function GrafikBatangJenisKelamin({ data }: GrafikBatangProps) {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>Perbandingan Jenis Kelamin</CardTitle>
        <CardDescription>Jumlah penduduk berdasarkan jenis kelamin Pria dan Wanita.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
            <YAxis allowDecimals={false} stroke="hsl(var(--foreground))"/>
            <Tooltip
                contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))"
                }}
            />
            <Legend />
            <Bar dataKey="value" fill="hsl(var(--primary))" name="Jumlah" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
