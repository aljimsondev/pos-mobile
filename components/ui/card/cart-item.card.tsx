import { Card, CardContent } from '@/components/reusable/card';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import { CartProduct, useCartStore } from '@/lib/store/cart-store';
import { THEME } from '@/lib/theme';
import { formatPHP } from '@/lib/utils/currency-formatter';
import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { Image } from 'expo-image';
import React from 'react';
import { useColorScheme, View } from 'react-native';

function CartItem({ item }: { item: CartProduct }) {
  const {
    toggleItemSelection,
    decrementItemSelectionQuantity,
    incrementItemSelectionQuantity,
  } = useCartStore();
  const scheme = useColorScheme() as 'light' | 'dark';
  const isDark = scheme === 'dark';

  return (
    <Card className="p-2">
      <CardContent className="flex-row gap-2 px-0">
        <View className="h-full items-center px-2 justify-center">
          <Checkbox
            value={item.selected}
            onValueChange={() => toggleItemSelection(item.product_id, item.id)}
            color={
              item.selected
                ? isDark
                  ? THEME[scheme].muted
                  : THEME[scheme].primary
                : undefined
            }
          />
        </View>
        <View className="w-[90px]">
          <Image
            source={item?.photo.url}
            style={{ width: '100%', aspectRatio: 3 / 4 }}
            contentFit="cover"
            contentPosition="center"
          />
        </View>
        <View className="flex-1">
          <Text className="line-clamp-2">{item?.productName}</Text>
          <Text className="text-sm">Variant: {item?.variation_name}</Text>
          <Text className="font-bold">{formatPHP(item?.unit_price || '')}</Text>

          <View className="mt-2">
            <Text className="text-xs">Quantity</Text>
            <View className="flex-row gap-1 items-center mt-2">
              <IconButton
                icon={(color) => (
                  <Feather name="minus" size={14} color={color} />
                )}
                className="w-7 h-7"
                onPress={() =>
                  decrementItemSelectionQuantity({
                    productId: item.product_id,
                    variationId: item.id,
                  })
                }
              />
              <Text className="px-2">{item?.quantity}</Text>
              <IconButton
                className="w-7 h-7"
                icon={(color) => (
                  <Feather name="plus" size={14} color={color} />
                )}
                onPress={() =>
                  incrementItemSelectionQuantity({
                    productId: item.product_id,
                    variationId: item.id,
                  })
                }
              />
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

export default CartItem;
