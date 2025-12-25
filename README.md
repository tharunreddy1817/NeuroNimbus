# NeuroNimbus

NeuroNimbus is a cloud-enabled memory assistance system for patients with cognitive difficulties and their caregivers. This is a Next.js application built with Firebase.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- `pnpm` (or `npm`/`yarn`)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root of the project and add your Firebase configuration and any other necessary API keys (e.g., for Google AI).

```
# Firebase client-side configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Genkit/Google AI API Key
GOOGLE_API_KEY=
```

### 3. Run with Firebase Emulators

For local development, it's highly recommended to use the Firebase Emulator Suite.

1.  **Start the emulators:**
    ```bash
    firebase emulators:start
    ```
    This will start emulators for Auth, Firestore, Storage, and Functions based on your `firebase.json` configuration.

2.  **Start the Next.js development server:**
    In a separate terminal, run:
    ```bash
    pnpm dev
    ```

The app will be available at `http://localhost:9002`, and the Firebase Emulator UI will be at `http://localhost:4000`.

### 4. Seed Demo Data

To populate the app with initial data for a better development experience:
1. Navigate to the `/settings` page in the application.
2. Click the "Create Demo Patient" button. This will create a sample patient, caregiver, memories, and notes.

## Deployment

To deploy the application to Firebase:

1.  **Build the Next.js app:**
    ```bash
    pnpm build
    ```

2.  **Deploy to Firebase:**
    ```bash
    firebase deploy
    ```
    This command will deploy your Next.js application to Firebase Hosting and any Genkit flows to Cloud Functions.
