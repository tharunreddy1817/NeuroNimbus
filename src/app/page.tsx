'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useUser } from '@/firebase';
import { LoaderCircle, User, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RoleSelectionPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight font-headline">
        Welcome to NeuroNimbus
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Please select your role to continue.
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-2xl w-full">
        <Link href="/dashboard?role=patient" className="h-full">
          <Card className="group flex h-full flex-col items-center justify-center p-8 text-center transition-all hover:bg-primary/5 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <User className="h-16 w-16 mx-auto text-primary" />
              <CardTitle className="text-2xl font-headline mt-4">
                Patient
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>View memories and daily schedule.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/login" className="h-full">
          <Card className="group flex h-full flex-col items-center justify-center p-8 text-center transition-all hover:bg-primary/5 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <Users className="h-16 w-16 mx-auto text-primary" />
              <CardTitle className="text-2xl font-headline mt-4">
                Family / Caregiver
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage memories and patient profile.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
