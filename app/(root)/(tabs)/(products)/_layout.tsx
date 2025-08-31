import { Stack } from 'expo-router';
import React from 'react';

function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="[productId]" options={{ headerShown: false }} />
    </Stack>
  );
}

export default ProductsLayout;
