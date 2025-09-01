import AppDrawer from '@/components/ui/AppDrawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <AppDrawer {...props} />}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default DrawerLayout;
