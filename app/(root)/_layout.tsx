import { useRedirectAccountSetup } from '@/hooks/useRedirectAccountSetup';
import { useCategoryStore } from '@/lib/store/category-store';
import { Stack } from 'expo-router';

export default function AppLayout() {
  useRedirectAccountSetup();
  const { getCategories } = useCategoryStore();
  getCategories();
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)" options={{ headerShown: false }} />
    </Stack>
  );
}
