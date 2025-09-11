import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Text } from '@/components/reusable/text';
import { Textarea } from '@/components/reusable/textarea';
import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import BrandSelect from './_component/brand-select';
import CategorySelect from './_component/category-select';
import MeasurementSelect from './_component/measurement-select';

export default function CreateProductForm() {
  return (
    <KeyboardAvoidingView behavior="padding" className="gap-2">
      <Text className="text-lg font-semibold">Product Information</Text>
      <View className="flex-row gap-2 w-full">
        <View className="gap-1 flex-1">
          <Label>Category</Label>
          <CategorySelect />
        </View>
        <View className="gap-1 flex-1">
          <Label>Title</Label>
          <BrandSelect />
        </View>
      </View>
      <View className="gap-1">
        <Label>Title</Label>
        <Input placeholder="adidas og samba" />
      </View>
      <View className="gap-1">
        <Label>Description</Label>
        <Textarea placeholder="Add product description..." />
      </View>
      <Text className="text-lg font-semibold">Product Variation</Text>
      <View className="gap-1">
        <Label>Variant Name</Label>
        <Input placeholder="adidas og samba" />
      </View>
      <View className="flex-row gap-2">
        <View className="gap-1">
          <Label>Unit of measurement</Label>
          <MeasurementSelect />
        </View>
        <View className="gap-1 flex-1">
          <Label>Unit price</Label>
          <Input placeholder="100" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
