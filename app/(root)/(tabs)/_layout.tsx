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
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
