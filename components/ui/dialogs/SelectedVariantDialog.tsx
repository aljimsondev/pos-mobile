import { Button } from '@/components/reusable/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/reusable/dialog';
import { Text } from '@/components/reusable/text';
import { useVariantDialogStore } from '@/lib/store/variation-store';
import { formatPHP } from '@/lib/utils/currency-formatter';
import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';

function SelectedVariantDialog() {
  const { isOpen, onSubmit, hide, variant } = useVariantDialogStore();
  return (
    <Dialog open={isOpen}>
      <DialogContent className={`min-w-full max-w-sm}`} hideCloseButton>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>Finalize selected variation!</DialogDescription>
        </DialogHeader>
        <View className="grid gap-4">
          <View className="flex-row gap-4">
            <View className="w-[100px]">
              <Image
                source={variant?.photo.url}
                style={{ width: '100%', aspectRatio: 3 / 4 }}
                contentFit="cover"
                contentPosition="center"
              />
            </View>
            <View>
              <Text>Variant: {variant?.variation_name}</Text>
              <Text className="font-bold text-xl">
                {formatPHP(variant?.unit_price || '')}
              </Text>
            </View>
          </View>
        </View>
        <DialogFooter className="flex-row justify-between">
          <DialogClose asChild onPress={hide}>
            <Button variant="outline">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button onPress={onSubmit}>
            <Text>Proceed</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SelectedVariantDialog;
