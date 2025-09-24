import { Button } from '@/components/reusable/button';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Text } from '@/components/reusable/text';
import { Textarea } from '@/components/reusable/textarea';
import SelectionButton from '@/components/ui/button/selection.button';
import { createProductFormSchema } from '@/lib/schema/product/create.product';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';

export default function CreateProductForm() {
  const { open, category, close, brand } = useBottomSheetStore();
  const form = useForm({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {},
    mode: 'all',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <View className="flex-1">
      <KeyboardAvoidingView behavior="padding" className="gap-2 flex-1">
        <View className="flex-1 gap-1">
          <Text className="text-lg font-semibold">Product Information</Text>
          <View className="flex-row justify-between gap-2 w-full">
            <View className="gap-1">
              <Label>Category</Label>
              <SelectionButton
                label="Select category"
                onPress={() => {
                  if (brand) {
                    close('category');
                  } else {
                    open('category');
                  }
                }}
              />
            </View>
            <View className="gap-1">
              <Label>Brand</Label>
              <SelectionButton
                label="Select brand"
                onPress={() => {
                  if (brand) {
                    close('brand');
                  } else {
                    open('brand');
                  }
                }}
              />
            </View>
          </View>
          <View className="gap-1">
            <Label>Title</Label>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState, formState }) => {
                return <Input {...field} placeholder="adidas og samba" />;
              }}
            />
          </View>
          <View className="gap-1">
            <Label>Description</Label>

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState, formState }) => {
                return (
                  <Textarea
                    {...field}
                    placeholder="Add product description..."
                  />
                );
              }}
            />
          </View>
          <Text className="text-lg font-semibold">Product Variation</Text>
          <View className="flex-row gap-2">
            <View className="gap-1">
              <Label>Unit of measurement</Label>
              <SelectionButton
                label="Unit of measurement"
                onPress={() => open('measurement')}
              />
            </View>
            <View className="gap-1 flex-1">
              <Label>Unit price</Label>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState, formState }) => {
                  return <Input {...field} placeholder="1000" />;
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Button onPress={onSubmit}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
