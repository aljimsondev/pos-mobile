import { Text } from '@/components/reusable/text';
import { HeaderTitle, MainHeaderRight } from '@/components/ui/header';
import { CartHeaderRight } from '@/components/ui/header/cart-header';
import { useCartSelectors } from '@/lib/store/cart-store';
import { NAV_THEME, THEME } from '@/lib/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

function TabBarLabel({
  color,
  focused,
  label,
}: {
  focused: boolean;
  color: string;
  label: string;
}) {
  const scheme = useColorScheme() as 'light' | 'dark';

  return (
    <Text
      style={{
        color: focused ? NAV_THEME[scheme].colors.primary : color,
      }}
      className="text-xs"
    >
      {label}
    </Text>
  );
}

function TabBarIcon({
  color,
  focused,
  size,
  focusedIconName,
  defaultIconName,
}: {
  focused: boolean;
  color: string;
  size: number;
  focusedIconName: any;
  defaultIconName: any;
}) {
  const scheme = useColorScheme() as 'light' | 'dark';

  return (
    <Ionicons
      color={focused ? NAV_THEME[scheme].colors.primary : color}
      name={focused ? focusedIconName : defaultIconName}
      size={size}
    />
  );
}

function TabLayout() {
  const { totalItems } = useCartSelectors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.light.foreground,
      }}
    >
      <Tabs.Screen
        name="(products)"
        options={{
          tabBarLabel: ({ color, focused }) => (
            <TabBarLabel color={color} focused={focused} label="Products" />
          ),
          // headerShown: false,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <MainHeaderRight />,
          headerRightContainerStyle: {
            padding: 8,
          },
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              color={color}
              focused={focused}
              size={size}
              defaultIconName="grid-outline"
              focusedIconName="grid"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          tabBarLabel: ({ color, focused }) => (
            <TabBarLabel color={color} focused={focused} label="Scanner" />
          ),
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              color={color}
              focused={focused}
              size={size}
              defaultIconName="qr-code-outline"
              focusedIconName="qr-code"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(cart)"
        options={{
          title: 'My Cart',
          tabBarBadge: totalItems,
          tabBarLabel: ({ color, focused }) => (
            <TabBarLabel color={color} focused={focused} label="Cart" />
          ),
          headerTitle: () => <HeaderTitle title="My Cart" />,
          headerRight: () => <CartHeaderRight />,
          headerRightContainerStyle: {
            padding: 8,
          },
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              color={color}
              focused={focused}
              size={size}
              defaultIconName="cart-outline"
              focusedIconName="cart"
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
