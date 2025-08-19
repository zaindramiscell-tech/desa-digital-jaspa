
"use client";

import { useState, useEffect } from 'react';
import { Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Using a custom SVG for WhatsApp as it's not in lucide-react
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // This code runs only on the client, after hydration
    setCurrentUrl(window.location.href);
  }, []);

  if (!currentUrl) {
    // You can return a placeholder or null until the URL is available
    return null;
  }

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  return (
    <div className="flex items-center gap-4">
      <h3 className="text-lg font-semibold text-foreground">Bagikan:</h3>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="icon" aria-label="Bagikan ke Facebook">
          <Link href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
            <Facebook />
          </Link>
        </Button>
        <Button asChild variant="outline" size="icon" aria-label="Bagikan ke Twitter">
          <Link href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            <Twitter />
          </Link>
        </Button>
        <Button asChild variant="outline" size="icon" aria-label="Bagikan ke WhatsApp">
          <Link href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
