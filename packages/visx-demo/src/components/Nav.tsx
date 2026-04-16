'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GithubButton from 'react-github-button';
import { Menu } from 'lucide-react';

import Belo from './icons/Belo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/utils/cn';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/gallery', label: 'Gallery' },
] as const;

function Nav() {
  const { pathname } = useRouter();
  const [open, setOpen] = React.useState(false);

  const linkClass = (href: string) =>
    cn(
      'text-base font-normal text-foreground transition-colors hover:text-primary',
      pathname === href && 'text-primary font-medium',
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-[105rem] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-2 rounded-md outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
            <span className="flex h-8 w-8 items-center justify-center">
              <Belo />
            </span>
            <span className="hidden font-semibold tracking-tight text-foreground sm:inline">visx</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navLinks.map(({ href, label }) => (
              <Button key={href} variant="ghost" size="sm" asChild className="text-base">
                <Link href={href} className={linkClass(href)}>
                  {label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="github-buttons flex shrink-0 items-center gap-2">
          <span className="hidden sm:inline">
            <GithubButton type="stargazers" namespace="airbnb" repo="visx" />
          </span>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw,20rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile main">
                {navLinks.map(({ href, label }) => (
                  <Button key={href} variant="ghost" className="justify-start text-base" asChild>
                    <Link
                      href={href}
                      className={linkClass(href)}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </Button>
                ))}
              </nav>
              <div className="mt-8 sm:hidden">
                <GithubButton type="stargazers" namespace="airbnb" repo="visx" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Nav;
