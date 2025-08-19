"use client"

import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ChartData {
  name: string;
  value: number;
}

interface GrafikPieProps {
  data: ChartData[];
}

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))"];

export function GrafikPieKomposisiUsia({ data }: GrafikPieProps) {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>Komposisi Usia</CardTitle>
        <CardDescription>Distribusi penduduk berdasarkan kelompok usia.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
                contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))"
                }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
