import type { PropsWithChildren } from 'react';

import AppNavbar from '@/components/app-navbar';
import { Container } from '@/components/ui/container';

import { Footer } from './components/footer';

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppNavbar className="sticky top-0 z-10" />
      <Container className="py-4">{children}</Container>
      <Footer />
    </>
  );
};
