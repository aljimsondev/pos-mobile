import { Text, View } from 'react-native';

import { authClient } from '@/lib/auth/client';

export default function Index() {
  const handleSignout = () => {
    authClient.signOut();
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={handleSignout}>Sign Out</Text>
    </View>
  );
}
