import { Card, CardContent } from '@/components/reusable/card';
import { Text } from '@/components/reusable/text';
import { Product } from '@/lib/types/product';
import { getImageUrl } from '@/lib/utils';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

type ProductCarProps = {
  product: Product & {
    photo: {
      file_name: string;
      id: number;
      mimetype: string;
      thumbnail_url: string | null;
      url: string;
    };
  };
  style?: StyleProp<ViewStyle>;
};

function ProductCard({ product, style }: ProductCarProps) {
  const photoUrl = getImageUrl(product.photo.url);
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.navigate({
          pathname: '/(root)/(stack)/[productId]',
          params: {
            productId: product.id,
            productName: product.name,
          },
        })
      }
    >
      <Card className="p-0 overflow-hidden" style={style}>
        <CardContent className="p-0">
          <Image
            source={photoUrl}
            style={{ width: '100%', aspectRatio: 3 / 4 }}
            contentFit="cover"
            contentPosition="center"
          />
          <View className="px-2 line-clamp-2 py-4">
            <Text>{product.name}</Text>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}

export default ProductCard;
