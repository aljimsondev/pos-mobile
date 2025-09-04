import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import { useCartSelectors, useCartStore } from '@/lib/store/cart-store';
import { useDialogStore } from '@/lib/store/dialog-store';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export function CartHeaderRight() {
  const { isEmpty, hasSelected } = useCartSelectors();
  const { clear, removeSelectedItems } = useCartStore();
  const { showDialog } = useDialogStore();

  const onDeleteSelected = () => {
    showDialog({
      title: 'Confirmation',
      description: 'Are you sure you want to remove selected items?',
      showCancel: true,
      showContinue: true,
      cancelText: 'No',
      continueText: 'Yes, delete it!',
      onContinue: removeSelectedItems,
    });
  };

  const onClearCart = () => {
    showDialog({
      title: 'Confirmation',
      description: 'Are you sure you want to clear items?',
      showCancel: true,
      showContinue: true,
      cancelText: 'No',
      continueText: 'Yes, clear it!',
      onContinue: clear,
    });
  };

  return (
    <View className="flex-1 flex-row items-center gap-2 justify-end">
      <IconButton
        icon={(color) => <Ionicons name="trash" size={18} color={color} />}
        disabled={!hasSelected}
        onPress={onDeleteSelected}
      />
      <Button variant="outline" disabled={isEmpty} onPress={onClearCart}>
        <Text>Clear</Text>
      </Button>
    </View>
  );
}
