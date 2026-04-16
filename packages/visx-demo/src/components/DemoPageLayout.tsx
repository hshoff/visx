import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils/cn';

export function DemoPageLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[min(56rem,calc(100vw-2rem))] flex-col gap-8 pb-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DemoPageSection({
  title,
  children,
  className,
  contentClassName,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <section className={cn('w-full space-y-3', className)}>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className={contentClassName}>{children}</div>
    </section>
  );
}

export function DemoPageCardSection({
  title,
  children,
  className,
  contentClassName,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <Card className={cn('w-full overflow-hidden', className)}>
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className={cn('pt-5', contentClassName)}>{children}</CardContent>
    </Card>
  );
}
