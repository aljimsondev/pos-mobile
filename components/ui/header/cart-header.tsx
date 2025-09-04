import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import { useCartSelectors } from '@/lib/store/cart-store';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useColorScheme, View } from 'react-native';

export function CartHeaderRight() {
  const { isEmpty } = useCartSelectors();
  const scheme = useColorScheme() as 'light' | 'dark';

  return (
    <View className="flex-1 flex-row items-center gap-2 justify-end">
      <IconButton
        icon={(color) => <Ionicons name="trash" size={18} color={color} />}
        disabled={isEmpty}
      />
      <Button variant="outline" disabled={isEmpty}>
        <Text>Clear</Text>
      </Button>
    </View>
  );
}
