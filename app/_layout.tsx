import SplashScreenController from '@/app/splash';
import { GlobalErrorDialog } from '@/components/ui/GlobalErrorDialog';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/lib/auth/client';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import './global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SplashScreenController />
      <RootNavigator />
      <StatusBar style="auto" />
      <PortalHost />
      <GlobalErrorDialog />
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
