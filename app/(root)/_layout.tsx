import { Stack } from 'expo-router';

export default function AppLayout() {
  // Renders the navigation stack for all authenticated app routes
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
