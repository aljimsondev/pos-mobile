import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export default function ManagementLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="product/index"
        options={{
          title: 'Manage products',
          headerBackVisible: false,
          headerRight: (props) => {
            return (
              <Button onPress={() => router.push('/manage/product/create')}>
                <Text>New</Text>
              </Button>
            );
          },
        }}
      />
      <Stack.Screen
        name="product/create"
        options={{
          title: 'New product',
        }}
      />
    </Stack>
  );
}
