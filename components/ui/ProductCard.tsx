import { Product } from '@/lib/types/product';
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
  console.log(product);
  return (
    <TouchableOpacity>
      <View className="bg-red-600 p-2" style={style}></View>
    </TouchableOpacity>
  );
}

export default ProductCard;
