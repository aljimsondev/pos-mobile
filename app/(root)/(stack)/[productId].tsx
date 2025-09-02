import { Text } from '@/components/reusable/text';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

function ProductVariations() {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <View>
      <Text>Product Variations</Text>
    </View>
  );
}

export default ProductVariations;
