
import {initializeApp, getApps, type FirebaseOptions} from 'firebase/app';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';
import {
  useCollection as useFirestoreCollection,
  type UseCollectionOptions,
} from './firestore/use-collection';
import {
  useDoc as useFirestoreDoc,
  type UseDocOptions,
} from './firestore/use-doc';
import {useUser, type UseUserOptions} from './auth/use-user';
import {
  useFirebaseApp,
  useFirestore as useFirebaseFirestore,
  useAuth as useFirebaseAuth,
  FirebaseProvider as FirebaseClientProvider, // Renaming for clarity
} from './client-provider';


let app: ReturnType<typeof initializeApp>;

const firebaseConfig: FirebaseOptions = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

function initializeFirebase() {
  if (app) {
    return {
      app,
      auth: getAuth(app),
      firestore: getFirestore(app),
    };
  }

  const apps = getApps();
  if (apps.length) {
    app = apps[0];
  } else {
    app = initializeApp(firebaseConfig);
  }

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
    const host = process.env.NEXT_PUBLIC_EMULATOR_HOST;
    // Important: Re-route emulator traffic to the container
    // See https://github.com/firebase/firebase-js-sdk/issues/6215
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    connectAuthEmulator(auth, `http://127.0.0.1:9099`, {
      disableWarnings: true,
    });
  }

  return {app, auth, firestore};
}

function useAuth(options?: UseUserOptions) {
  return useFirebaseAuth();
}

function useFirestore() {
  return useFirebaseFirestore();
}

function useCollection<T>(query: any, options: UseCollectionOptions) {
  return useFirestoreCollection<T>(query, options);
}

function useDoc<T>(ref: any, options: UseDocOptions) {
  return useFirestoreDoc<T>(ref, options);
}

const FirebaseProvider = FirebaseClientProvider;

export {
  initializeFirebase,
  FirebaseProvider,
  useFirebaseApp,
  useFirestore,
  useAuth,
  useCollection,
  useDoc,
  useUser,
};
