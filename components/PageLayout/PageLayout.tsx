'use client';

import { useSession } from 'next-auth/react';
import { AppShell, Burger, Button, Group, LoadingOverlay, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';
import LogInModal from '@/components/LogInModal/LogInModal';

export default function PageLayout({ children }: { children: any }) {
  const [navbarIsOpened, { toggle: toggleNavBar }] = useDisclosure();
  const [modalOpened, { toggle: toggleModal, close: closeModal }] = useDisclosure();
  const { data: session, status } = useSession();
  const isUserLoggedIn = status === 'authenticated';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !navbarIsOpened },
      }}
      padding="md"
    >
      {status === 'loading' && <LoadingOverlay visible />}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={navbarIsOpened} onClick={toggleNavBar} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title c="blue" order={3}>
              Wayble Job Board
            </Title>
            <Group ml="xl" gap={0} visibleFrom="sm">
              {isUserLoggedIn ? (
                <Text>
                  Hi,{' '}
                  <Text span fw="700">
                    {session?.user?.name}
                  </Text>
                </Text>
              ) : (
                <Button onClick={toggleModal}>Log In</Button>
              )}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {isUserLoggedIn ? (
          <Text>Welcome, {session?.user?.name}</Text>
        ) : (
          <Button onClick={toggleModal}>Log In</Button>
        )}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
      <LogInModal opened={modalOpened} onClose={closeModal} />
    </AppShell>
  );
}
