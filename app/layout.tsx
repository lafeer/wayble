import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import { Providers } from '@/providers';
import PageLayout from '@/components/PageLayout/PageLayout';
import { auth } from '@/auth';

export const metadata = {
  title: 'Wayble Job Board',
  description: 'A job board for Wayble',
};

export default async function RootLayout({ children }: { children: any }) {
  await auth();
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers>
          <PageLayout>{children}</PageLayout>
        </Providers>
      </body>
    </html>
  );
}
