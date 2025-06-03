import type { PropsWithChildren } from 'react';

import AppNavbar from '@/components/app-navbar';
import { Container } from '@/components/ui/container';

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppNavbar />
      <Container>{children}</Container>
    </>
  );
};
