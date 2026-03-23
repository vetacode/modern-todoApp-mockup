import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todolist App',
  description: 'Created with love',
  generator: 'VetaCode',
  icons: {
    icon: [
      {
        url: '/taskflow.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/taskflow.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/taskflow.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/taskflow.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='font-sans antialiased'>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
