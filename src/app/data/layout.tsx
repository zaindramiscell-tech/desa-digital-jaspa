
import { NavigasiData } from "@/components/data/NavigasiData";

export default function DataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            <aside className="md:w-1/4 lg:w-1/5">
                <NavigasiData />
            </aside>
            <main className="flex-1">
                {children}
            </main>
        </div>
    </div>
  );
}
