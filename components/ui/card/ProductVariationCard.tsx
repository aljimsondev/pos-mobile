import { Card, CardContent } from '@/components/reusable/card';
import { Text } from '@/components/reusable/text';
import { useVariantDialogStore } from '@/lib/store/variation-store';
import { ProductVariation } from '@/lib/types/product';
import { getImageUrl } from '@/lib/utils';
import { formatPHP } from '@/lib/utils/currency-formatter';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

type ProductVariatiobCardProps = {
  variation: ProductVariation;
  style?: StyleProp<ViewStyle>;
};

function ProductVariationCard({ variation, style }: ProductVariatiobCardProps) {
  const { show } = useVariantDialogStore();
  const photoUrl = getImageUrl(variation.photo.url);
  const { productName } = useLocalSearchParams<{ productName: string }>();

  const onPress = () => {
    show({
      variant: {
        ...variation,
        photo: {
          ...variation.photo,
          url: photoUrl,
        },
      },
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Card className="p-0 overflow-hidden" style={style}>
        <CardContent className="p-0">
          <Image
            source={photoUrl}
            style={{ width: '100%', aspectRatio: 3 / 4 }}
            contentFit="cover"
            contentPosition="center"
          />
          <View className="px-2 line-clamp-2 py-4">
            <Text className="text-sm text-muted-foreground">{productName}</Text>
            <Text>{variation.variation_name}</Text>
            <Text className="font-bold">{formatPHP(variation.unit_price)}</Text>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}

export default ProductVariationCard;
