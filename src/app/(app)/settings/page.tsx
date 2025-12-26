
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser, useFirestore } from '@/firebase';
import { Bot, LoaderCircle } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
    const { user, loading } = useUser();
    const firestore = useFirestore();
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user && firestore) {
            const userDocRef = doc(firestore, 'users', user.uid);
            getDoc(userDocRef).then(docSnap => {
                if (docSnap.exists()) {
                    setUserRole(docSnap.data().role);
                    setUserName(docSnap.data().displayName);
                }
            });
        }
    }, [user, firestore]);
    
    if (loading) {
        return <div className="flex items-center justify-center h-full"><LoaderCircle className="h-8 w-8 animate-spin" /></div>
    }

    if (!user) {
        return null;
    }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application settings.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is your public display name and email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={userName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user.email ?? ''} disabled />
          </div>
           <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue={userRole} disabled />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Demo Data</CardTitle>
          <CardDescription>For development purposes, you can create a sample patient with associated memories, people, and events.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button>
                <Bot className="mr-2 h-4 w-4" />
                Create Demo Patient
            </Button>
        </CardContent>
      </Card>

      <Button variant="destructive" className='w-fit'>Delete Account</Button>
    </div>
  );
}
