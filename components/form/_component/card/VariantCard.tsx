import { Text } from '@/components/reusable/text';
import PhotoCard from '@/components/ui/card/PhotoCard';
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
      <View className="flex-row gap-2">
        <PhotoCard uri={variant.photo.uri} className="border-transparent" />
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
          <Text className="font-bold text-lg">
            {formatPHP(variant.unit_price)}
          </Text>
        </View>
      </View>
      <IconButton
        icon={(color) => <Ionicons name="close" size={18} color={color} />}
        activeOpacity={1}
        iconTheme="mutedForeground"
        className="border-transparent rounded-full absolute -top-2 -right-2 p-1 m-2 h-fit w-fit active:bg-muted"
        onPress={handleRemoveVariant}
      />
    </View>
  );
}

export default VariantCard;
