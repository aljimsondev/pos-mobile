import { authClient, type Session } from '@/lib/auth/client';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export function useRedirectAccountSetup() {
  const { data, isPending } = authClient.useSession();
  const hasSession = !!data?.session;
  const router = useRouter();

  useEffect(() => {
    if (isPending) return; // Wait for auth to load

    if (hasSession && !(data.user as Session['user'])?.setupComplete) {
      router.replace('/account-setup');
    }
  }, [hasSession, data?.user, isPending, router]);
}
