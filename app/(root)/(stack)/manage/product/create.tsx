import CreateProductForm from '@/components/form/create-product.form';
import React from 'react';
import { View } from 'react-native';

export default function CreateProduct() {
  return (
    <View className="p-4 flex-1">
      <CreateProductForm />
    </View>
  );
}
