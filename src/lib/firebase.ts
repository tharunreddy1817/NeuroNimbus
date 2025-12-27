
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Checks for an env var and returns it, or a placeholder if not found.
 * In a real production app, you'd want to throw an error if the env var is missing.
 */
function getEnv(name: string, fallback = `missing-${name}`): string {
  const value = process.env[name];
  return value ?? fallback;
}

const firebaseConfig = {
  apiKey: getEnv('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('NEXT_PUBLIC_FIREBASE_APP_ID'),
};

// Prevent Firebase from being initialized more than once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export Firebase services as singletons
export const auth = getAuth(app);
export const db = getFirestore(app);
