import React from 'react';
import Twitter from './icons/Twitter';
import Medium from './icons/Medium';
import GitHub from './icons/GitHub';
import { Separator } from '@/components/ui/separator';

function Footer() {
  return (
    <footer className="wrapper mt-auto w-full max-w-[105rem] px-4 pb-10 pt-6 sm:px-6">
      <Separator className="mb-8" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-light text-muted-foreground">
          <a
            href="https://airbnb.io"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Airbnb.io
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-8 sm:justify-end">
          <a
            href="https://github.com/airbnb/visx"
            className="flex h-9 w-9 items-center justify-center text-foreground opacity-80 transition-opacity hover:opacity-100"
            aria-label="GitHub"
          >
            <GitHub />
          </a>
          <a
            href="https://x.com/AirbnbEng"
            className="flex h-9 w-9 items-center justify-center text-foreground opacity-80 transition-opacity hover:opacity-100"
            aria-label="X"
          >
            <Twitter />
          </a>
          <a
            href="https://medium.com/airbnb-engineering"
            className="flex h-9 w-9 items-center justify-center text-foreground opacity-80 transition-opacity hover:opacity-100"
            aria-label="Medium"
          >
            <Medium />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
