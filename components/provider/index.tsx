import { AppSheetProvider } from '@/components/ui/bottom-sheet';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function RootProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const client = new QueryClient();
  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light}
    >
      <QueryClientProvider client={client}>
        <GestureHandlerRootView>
          <AppSheetProvider>{children}</AppSheetProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default RootProvider;
