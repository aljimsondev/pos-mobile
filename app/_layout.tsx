import SplashScreenController from '@/app/splash';
import RootProvider from '@/components/provider';
import { GlobalDialog } from '@/components/ui/dialogs/GlobalDialog';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/lib/auth/client';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';
import './global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    <ThemeProvider
      value={colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light}
    >
      <GestureHandlerRootView>
        <RootProvider>
          <SplashScreenController />
          <RootNavigator />
          <StatusBar style="auto" />
          <PortalHost />
          <ToastManager />
          <GlobalDialog />
        </RootProvider>
      </GestureHandlerRootView>
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
