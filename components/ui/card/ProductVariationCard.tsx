import { Card, CardContent } from '@/components/reusable/card';
import { Text } from '@/components/reusable/text';
import { ProductVariation } from '@/lib/types/product';
import { getImageUrl } from '@/lib/utils';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

type ProductVariatiobCardProps = {
  variation: ProductVariation;
  style?: StyleProp<ViewStyle>;
};

function ProductVariationCard({ variation, style }: ProductVariatiobCardProps) {
  const photoUrl = getImageUrl(variation.photo.url);
  const { productName } = useLocalSearchParams<{ productName: string }>();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
      <Card className="p-0 overflow-hidden" style={style}>
        <CardContent className="p-0">
          <Image
            source={photoUrl}
            style={{ width: '100%', aspectRatio: 3 / 4 }}
            contentFit="cover"
            contentPosition="center"
          />
          <View className="px-2 line-clamp-2 py-4">
            <Text>{productName}</Text>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}

export default ProductVariationCard;
