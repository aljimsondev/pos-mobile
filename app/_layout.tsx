import SplashScreenController from '@/app/splash';
import { GlobalDialog } from '@/components/ui/dialogs/GlobalDialog';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/lib/auth/client';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';
import './global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const client = new QueryClient();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    NicoMoji: require('../assets/fonts/NicoMoji-Regular.ttf'),
    Nebula: require('../assets/fonts/Nebula-Regular.otf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={client}>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar style="auto" />
        <PortalHost />
        <ToastManager />
        <GlobalDialog />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { data } = authClient.useSession();
  const hasSession = !!data?.session;

  return (
    <Stack>
      <Stack.Protected guard={!hasSession}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={hasSession}>
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
