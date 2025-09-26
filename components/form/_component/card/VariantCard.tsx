import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import useThemeVariables from '@/hooks/useThemeVariables';
import { ProductVariationSchema } from '@/lib/schema/product/create.product';
import { useCreateProductStore } from '@/lib/store/create-product-store';
import { formatPHP } from '@/lib/utils/currency-formatter';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface VariantCardProps {
  variant: ProductVariationSchema;
}

function VariantCard({ variant }: VariantCardProps) {
  const themeColor = useThemeVariables();
  const { unsetVariant } = useCreateProductStore();

  const handleRemoveVariant = () => unsetVariant(variant.variation_name);

  return (
    <View className="relative">
      <View className="items-end flex-row justify-between">
        <View>
          <Text>{variant.variation_name}</Text>
          <Text className="text-muted-foreground text-sm">
            Measurement: {variant.unit_of_measurement}
          </Text>
          <View className="flex items-center flex-row gap-1">
            <MaterialCommunityIcons
              name="barcode"
              size={24}
              color={themeColor.primary}
            />
            <Text className="text-muted-foreground text-sm">
              {variant.barcode}
            </Text>
          </View>
        </View>
        <Text className="font-bold text-lg">
          {formatPHP(variant.unit_price)}
        </Text>
      </View>
      <IconButton
        icon={(color) => <Ionicons name="close" size={18} color={color} />}
        activeOpacity={1}
        iconTheme="mutedForeground"
        className="border-transparent rounded-full absolute -top-6 -right-6 m-0 active:bg-transparent"
        onPress={handleRemoveVariant}
      />
    </View>
  );
}

export default VariantCard;
