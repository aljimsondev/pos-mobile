import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import { useCartSelectors, useCartStore } from '@/lib/store/cart-store';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export function CartHeaderRight() {
  const { isEmpty, hasSelected } = useCartSelectors();
  const { clear, removeSelectedItems } = useCartStore();

  return (
    <View className="flex-1 flex-row items-center gap-2 justify-end">
      <IconButton
        icon={(color) => <Ionicons name="trash" size={18} color={color} />}
        disabled={!hasSelected}
        onPress={removeSelectedItems}
      />
      <Button variant="outline" disabled={isEmpty} onPress={clear}>
        <Text>Clear</Text>
      </Button>
    </View>
  );
}
