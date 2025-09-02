import { HeaderTitle, MainHeaderRight } from '@/components/ui/Header';
import { THEME } from '@/lib/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
function TabLayout() {
  const navigation = useNavigation();
  const toggleDrawer = () => (navigation as any).toggleDrawer();

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
          // headerShown: false,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <MainHeaderRight />,
          headerRightContainerStyle: {
            padding: 8,
          },
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
          title: 'My Cart',
          tabBarLabel: 'Cart',
          headerTitle: () => <HeaderTitle title="My Cart" />,
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
