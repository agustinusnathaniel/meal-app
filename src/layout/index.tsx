import type { PropsWithChildren } from 'react';

import AppNavbar from '@/components/app-navbar';
import { Container } from '@/components/ui/container';

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppNavbar className="sticky top-0 z-10" />
      <Container className="py-4">{children}</Container>
      <footer className="text-center py-4">
        {new Date().getFullYear()} -{' '}
        <a
          href="https://agustinusnathaniel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          agustinusnathaniel.com
        </a>
      </footer>
    </>
  );
};
