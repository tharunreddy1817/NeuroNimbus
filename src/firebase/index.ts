import {
  FirebaseProvider,
  useFirebaseApp,
  useAuth,
  useFirestore,
} from './client-provider';
import { useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';

// This is the primary export for all client-side Firebase functionality.
// It simplifies imports across the application.

export {
  FirebaseProvider,
  useFirebaseApp,
  useAuth,
  useFirestore,
  useUser,
  useCollection,
  useDoc,
};
