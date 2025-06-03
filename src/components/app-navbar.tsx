'use client';

import { IconArchive } from '@intentui/icons';
import { Separator } from 'react-aria-components';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { Navbar } from '@/components/ui/navbar';

export default function AppNavbar(props: React.ComponentProps<typeof Navbar>) {
  return (
    <Navbar {...props}>
      <Navbar.Nav>
        <Navbar.Logo href="/">
          <IconArchive className="size-6 sm:size-5" />
        </Navbar.Logo>
        <Navbar.Section>
          <Navbar.Item href="/" isCurrent>
            Home
          </Navbar.Item>
        </Navbar.Section>

        <Navbar.Section className="ml-auto hidden md:flex">
          <Navbar.Flex className="sm:gap-x-1">
            <ThemeSwitcher appearance="plain" />
          </Navbar.Flex>
        </Navbar.Section>
      </Navbar.Nav>

      <Navbar.Compact>
        <Navbar.Flex>
          <Navbar.Trigger className="-ml-2" />
          <Separator orientation="vertical" className="h-6 sm:mx-1" />
          <Navbar.Logo href="/">
            <IconArchive className="size-5" />
          </Navbar.Logo>
        </Navbar.Flex>
        <Navbar.Flex>
          <Navbar.Flex>
            <ThemeSwitcher appearance="plain" />
          </Navbar.Flex>
        </Navbar.Flex>
      </Navbar.Compact>
    </Navbar>
  );
}
