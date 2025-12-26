'use client';

import {useEffect, useState} from 'react';
import type {User} from 'firebase/auth';
import {onAuthStateChanged} from 'firebase/auth';
import { useAuth, useFirestore } from '..';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import type { User as UserProfile } from '@/lib/types';


export type UseUserOptions = {
  listen: boolean;
};

const DEFAULT_OPTIONS = {
  listen: true,
};

export function useUser(options?: UseUserOptions) {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          setProfile(null);
        }
      }, (err) => {
        console.error("Error fetching user profile:", err);
        setError(err);
      });

      return () => unsubscribe();
    } else {
      setProfile(null);
    }
  }, [user, firestore]);

  return {user, profile, loading, error};
}
