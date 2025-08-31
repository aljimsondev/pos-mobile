import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { LayoutDashboard, ShoppingCart } from 'lucide-react-native';
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
            <LayoutDashboard color={color} size={size} />
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
            <ShoppingCart color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
