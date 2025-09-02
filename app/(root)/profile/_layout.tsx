import { Stack } from 'expo-router';
import React from 'react';

function UserPageLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
        }}
      />
    </Stack>
  );
}

export default UserPageLayout;
