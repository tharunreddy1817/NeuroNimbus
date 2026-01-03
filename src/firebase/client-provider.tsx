'use client';

import { createContext, useContext, useMemo } from 'react';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

type FirebaseCtx = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

const FirebaseContext = createContext<FirebaseCtx | null>(null);

function getFirebaseConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    // Return a dummy config if env vars are not set
    return {
      apiKey: "dummy",
      authDomain: "dummy.firebaseapp.com",
      projectId: "dummy",
      storageBucket: "dummy.appspot.com",
      messagingSenderId: "dummy",
      appId: "dummy"
    };
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  };
}

function getClientApp() {
  const config = getFirebaseConfig();
  if (config.apiKey === "dummy") {
     const dummyApp = getApps().find(app => app.name === 'dummy-app');
     if (dummyApp) return dummyApp;
     return initializeApp(config, 'dummy-app');
  }
  return getApps().length ? getApp() : initializeApp(config);
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => {
    const app = getClientApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return { app, auth, firestore };
  }, []);

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

// These names match what your index.ts expects to re-export
export function useFirebaseApp() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) throw new Error('useFirebaseApp must be used within FirebaseProvider');
  return ctx.app;
}

export function useAuth() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) throw new Error('useAuth must be used within FirebaseProvider');
  return ctx.auth;
}

export function useFirestore() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) throw new Error('useFirestore must be used within FirebaseProvider');
  return ctx.firestore;
}
