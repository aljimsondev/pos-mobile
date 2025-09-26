import { Button } from '@/components/reusable/button';
import { Card, CardContent } from '@/components/reusable/card';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import { Textarea } from '@/components/reusable/textarea';
import SelectionButton from '@/components/ui/button/selection.button';
import { createProductFormSchema } from '@/lib/schema/product/create.product';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useBrandStore } from '@/lib/store/brand-store';
import { useCategoryStore } from '@/lib/store/category-store';
import { useCreateProductStore } from '@/lib/store/create-product-store';
import { useUnitMeasurementStore } from '@/lib/store/measurement-store';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import VariantCard from './_component/card/VariantCard';

export default function CreateProductForm() {
  const { open, category, close, brand, createProductVariation } =
    useBottomSheetStore();
  const { selectedCategory } = useCategoryStore();
  const { selectedMeasurement } = useUnitMeasurementStore();
  const { variations } = useCreateProductStore();
  const { selectedBrand } = useBrandStore();
  const form = useForm({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {},
    mode: 'all',
  });

  const handleAddVariation = () => {
    if (createProductVariation) {
      close('createProductVariation');
    } else {
      open('createProductVariation');
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <View className="flex-1">
      <KeyboardAvoidingView behavior="padding" className="gap-2 flex-1">
        <View className="flex-1 gap-1">
          <Text className="text-lg font-semibold">Product Information</Text>
          <View className="flex-row justify-between gap-2 w-full">
            <View className="gap-1 flex-1">
              <Label>Category</Label>
              <SelectionButton
                value={selectedCategory?.name}
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
            <View className="gap-1 flex-1">
              <Label>Brand</Label>
              <SelectionButton
                value={selectedBrand?.name}
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
          {/*************start of VARIATION SECION***************** */}
          <Separator className="my-4" />
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Product Variation</Text>
            <Button variant="secondary" size="sm" onPress={handleAddVariation}>
              <Ionicons name="add" size={24} />
              <Text>Add variation</Text>
            </Button>
          </View>
          <Card className="mt-4">
            <CardContent>
              {variations.map((variant) => {
                return (
                  <VariantCard variant={variant} key={variant.variation_name} />
                );
              })}
            </CardContent>
          </Card>
          {/*************end of VARIATION SECION***************** */}
        </View>
      </KeyboardAvoidingView>
      <Button onPress={onSubmit}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
