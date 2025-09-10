import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

function RootStackLayout() {
  const params = useLocalSearchParams<{
    productName: string;
    productId: string;
  }>();

  return (
    <Stack>
      <Stack.Screen name="account-setup" options={{ headerShown: false }} />
      <Stack.Screen
        name="[productId]"
        options={{
          title: params.productName || 'Product Variations',
        }}
      />
      <Stack.Screen name="manage" options={{ headerShown: false }} />
    </Stack>
  );
}

export default RootStackLayout;
