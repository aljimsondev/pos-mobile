import { THEME } from '@/lib/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.light.foreground,
      }}
    >
      <Tabs.Screen
        name="(products)"
        options={{
          tabBarLabel: 'Products',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              color={color}
              name={focused ? 'grid' : 'grid-outline'}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          tabBarLabel: 'Scanner',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              color={color}
              name={focused ? 'qr-code' : 'qr-code-outline'}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              color={color}
              name={focused ? 'cart' : 'cart-outline'}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
