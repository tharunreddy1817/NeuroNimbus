
import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1 p-4 md:p-6">{children}</main>
      <Toaster />
    </>
  );
}
