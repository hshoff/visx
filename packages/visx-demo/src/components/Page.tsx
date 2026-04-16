import React from 'react';
import Meta from './Meta';
import Nav from './Nav';
import { cn } from '@/utils/cn';

function Page({
  children,
  title,
  className,
  wrapper = true,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string | boolean;
  wrapper?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col text-foreground',
        wrapper && 'wrapper',
        typeof className === 'string' && className,
      )}
    >
      <Meta title={title} />
      <Nav />
      <main className={cn('flex-1 px-4 pb-10 pt-6 sm:px-6', wrapper && 'mx-auto w-full max-w-[105rem]')}>
        {children}
      </main>
    </div>
  );
}

export default Page;
