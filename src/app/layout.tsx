
import type { Metadata, ResolvingMetadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { getSetelan } from '@/lib/setelan';
import { ThemeProvider } from '@/components/layout/theme-provider';

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const setelan = await getSetelan();
 
  return {
    title: {
      default: setelan.namaDesa,
      template: `%s | ${setelan.namaDesa}`,
    },
    description: setelan.deskripsiSitus,
    icons: null, // Explicitly disable default favicon handling
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
