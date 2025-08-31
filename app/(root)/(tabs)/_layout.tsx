import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(products)"
        options={{
          tabBarLabel: 'Products',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons color={color} name="grid-view" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          tabBarLabel: 'Scanner',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons color={color} name="qr-code-scanner" size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons
              color={color}
              name="shopping-cart-checkout"
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
