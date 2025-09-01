import { Product } from '@/lib/types/product';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

type ProductCarProps = {
  product: Product;
  style?: StyleProp<ViewStyle>;
};

function ProductCard({ product, style }: ProductCarProps) {
  return (
    <TouchableOpacity>
      <View className="bg-red-600 p-2" style={style}></View>
    </TouchableOpacity>
  );
}

export default ProductCard;
