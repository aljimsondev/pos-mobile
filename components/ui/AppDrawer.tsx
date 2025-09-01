import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import Container from '@/components/ui/Container';
import { authClient } from '@/lib/auth/client';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View } from 'react-native';

function AppDrawer({
  descriptors,
  navigation,
  state,
}: DrawerContentComponentProps) {
  return (
    <Container className="py-safe px-2">
      <ScrollView className="flex-1">
        <View className="py-3 border-b-border border-b-[1px]">
          <Text style={{ fontFamily: 'NicoMoji', fontSize: 24 }}>MENU</Text>
        </View>
      </ScrollView>
      <Button onPress={() => authClient.signOut()}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
}

export default AppDrawer;
