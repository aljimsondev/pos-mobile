import { authClient, type Session } from '@/lib/auth/client';
import { Stack, useRouter } from 'expo-router';
import { useLayoutEffect } from 'react';

export default function AppLayout() {
  const { data } = authClient.useSession();
  const hasSession = !!data?.session;
  const router = useRouter();

  useLayoutEffect(() => {
    if (hasSession && !(data.user as Session['user']).setupComplete)
      router.replace('/(root)/(setup)');
  }, [data]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(setup)" options={{ headerShown: false }} />
    </Stack>
  );
}
