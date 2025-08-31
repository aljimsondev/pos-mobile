import { Text } from '@/components/reusable/text';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

function Products() {
  return (
    <View>
      <Text>Products page</Text>
      <Link href="/(root)/(tabs)/(products)/search">
        <Text className="underline">Search Product</Text>
      </Link>
      <Link href="/(root)/(tabs)/(products)/1">
        <Text className="underline">View Product</Text>
      </Link>
    </View>
  );
}

export default Products;
