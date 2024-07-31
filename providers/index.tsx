'use client';

import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import GlobalStateProvider from '@/context/GlobalStateContext';
import { theme } from '../theme';

export function Providers({ children }: { children: any }) {
  return (
    <SessionProvider>
      <MantineProvider theme={theme}>
        <GlobalStateProvider>{children}</GlobalStateProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
