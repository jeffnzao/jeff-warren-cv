import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jeff Warren | Consultant Technique ServiceNow',
  description:
    'Jeff Warren NZAO BEDIAKO – Expert ITSM, développeur et architecte de solutions ServiceNow innovantes. Disponible pour de nouvelles opportunités.',
  keywords: ['ServiceNow', 'ITSM', 'Consultant', 'ITIL', 'Jeff Warren', 'EDF', 'BNP Paribas'],
  authors: [{ name: 'Jeff Warren NZAO BEDIAKO' }],
  openGraph: {
    title: 'Jeff Warren | Consultant Technique ServiceNow',
    description: 'Expert ITSM & architecte de solutions ServiceNow innovantes.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
