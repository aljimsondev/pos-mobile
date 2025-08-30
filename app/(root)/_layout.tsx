import { authClient } from '@/lib/auth/client';
import { fetcher } from '@/lib/utils';
import { Stack, useRouter } from 'expo-router';
import { useLayoutEffect } from 'react';

export default function AppLayout() {
  const { data } = authClient.useSession();
  const router = useRouter();

  async function checkUserAccountSetup() {
    if (!data) return;
    const response = await fetcher(`user/${data.user.id}`);
    const body = await response.json();

    const dataResponse = body.data;

    if (!dataResponse?.account?.setupCompleted) {
      console.warn('Account not set up');
      return router.replace('/(root)/(setup)');
    }
  }

  useLayoutEffect(() => {
    checkUserAccountSetup();
  }, [data]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(setup)" options={{ headerShown: false }} />
    </Stack>
  );
}
