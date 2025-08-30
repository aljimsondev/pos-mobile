import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/auth`, // Base URL of your Better Auth backend.
  plugins: [
    expoClient({
      scheme: 'pos',
      storagePrefix: 'pos',
      storage: SecureStore,
    }),
  ],
});
