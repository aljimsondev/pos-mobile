import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import Container from '@/components/ui/Container';
import { authClient } from '@/lib/auth/client';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView } from 'react-native';

function AppDrawer({
  descriptors,
  navigation,
  state,
}: DrawerContentComponentProps) {
  return (
    <Container className="py-safe px-2">
      <ScrollView className="flex-1">
        <Text
          className="text-2xl font-bold
        "
        >
          Menu
        </Text>
      </ScrollView>
      <Button onPress={() => authClient.signOut()}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
}

export default AppDrawer;
