import CreateProductForm from '@/components/form/create-product.form';
import React from 'react';
import { ScrollView } from 'react-native';

export default function CreateProduct() {
  return (
    <ScrollView className="flex-1 p-4">
      <CreateProductForm />
    </ScrollView>
  );
}
