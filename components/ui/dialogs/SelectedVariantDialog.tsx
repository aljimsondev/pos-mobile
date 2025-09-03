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
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import { useVariantDialogStore } from '@/lib/store/variation-store';
import { formatPHP } from '@/lib/utils/currency-formatter';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { View } from 'react-native';

function SelectedVariantDialog() {
  const { isOpen, hide, variant } = useVariantDialogStore();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => {
      if (prev <= 1) return 1;

      return prev - 1;
    });

  const handleSubmit = () => {
    // add to cart
  };
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

              <View className="mt-4">
                <Text className="text-sm">Quantity</Text>
                <View className="flex-row gap-2 items-center mt-2">
                  <IconButton
                    icon={<Feather name="minus" size={24} />}
                    onPress={handleDecrement}
                  />
                  <Text className="px-2">{quantity}</Text>
                  <IconButton
                    icon={<Feather name="plus" size={24} />}
                    onPress={handleIncrement}
                  />
                </View>
              </View>
            </View>
          </View>
          <Separator className="w-full" />
        </View>
        <DialogFooter className="flex-row justify-between">
          <DialogClose asChild onPress={hide}>
            <Button variant="outline">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button onPress={handleSubmit}>
            <Text>Proceed</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SelectedVariantDialog;
