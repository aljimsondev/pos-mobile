import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import { useCartSelectors } from '@/lib/store/cart-store';
import { THEME } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export function CartHeaderRight() {
  const { isEmpty } = useCartSelectors();
  return (
    <View className="flex-1 flex-row items-center gap-2 justify-end">
      <IconButton
        icon={
          <Ionicons
            name="trash"
            size={18}
            color={isEmpty ? THEME.light.mutedForeground : THEME.light.primary}
          />
        }
        disabled={isEmpty}
      />
      <Button variant="outline" disabled={isEmpty}>
        <Text>Clear</Text>
      </Button>
    </View>
  );
}
