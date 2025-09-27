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
import { fetcher } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { Fragment, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { Toast } from 'toastify-react-native';
import VariantCard from './_component/card/VariantCard';

export default function CreateProductForm() {
  const { open, category, close, brand, createProductVariation } =
    useBottomSheetStore();
  const { selectedCategory, setCallback, unsetCallback } = useCategoryStore();
  const { variations } = useCreateProductStore();
  const {
    selectedBrand,
    setCallback: setBrandCallback,
    unsetCallback: unsetBrandCallback,
  } = useBrandStore();
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
    try {
      console.log(data);
      if (!selectedBrand?.id) throw new Error('Brand id is required!');
      if (!selectedCategory?.id) throw new Error('Category id is required!');
      // 1. Create root product
      console.log('Initiating product creation...');
      const createProductResponse = await fetcher('product/create', {
        method: 'POST',
        body: JSON.stringify({
          brand_id: selectedBrand.id,
          category_id: selectedCategory.id,
          description: data.description,
          name: data.name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const body = await createProductResponse.json();
      if (createProductResponse.status !== 201)
        throw new Error(body?.error?.message);

      if (body.success) {
        // created
        const productId = body?.data?.id;
        if (!productId) throw new Error('Product id is not found!');
        // 2. Create product variants
        await createProductVariants(productId);

        // unset callback
        // unsetCallback();
        // form.reset();
        Toast.success('Product created successfully!');
      }
    } catch (e: any) {
      Toast.error(e?.message || 'Something went wrong!');
    }
  });

  const createProductVariants = async (productId: string) => {
    try {
      return await Promise.all(
        variations.map(async (variant) => {
          const formdata = new FormData();
          const _photo = variant.photo as ImagePickerAsset;

          // append image file
          formdata.append('photo', {
            uri: _photo.uri,
            type: _photo.type,
            name: _photo.fileName,
          } as any);

          // map the variant
          Object.entries(variant).map(([key, value]) => {
            // exclude photo
            if (key !== 'photo') {
              formdata.append(key, value);
            }
          });

          const response = await fetcher(`product/${productId}/variation`, {
            method: 'POST',
            body: formdata,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const body = await response.json();
          console.log(body);
          if (response.status !== 201)
            throw new Error(body?.error?.message || 'Internal server error!');

          console.log('Variant added successfully!' + JSON.stringify(body));
        }),
      );
    } catch (e) {
      throw e;
    }
  };

  const onSelectCategory = useCallback(() => {
    if (category) {
      close('category');
      unsetCallback(); // unset callback on dismiss sheet
    } else {
      open('category');
      setCallback((category) => form.setValue('category_id', category.id));
    }
  }, [category]);

  const onSelectBrand = useCallback(() => {
    if (brand) {
      close('brand');
      unsetBrandCallback(); // unset callback on dismiss sheet
    } else {
      open('brand');
      setBrandCallback((brand) => form.setValue('brand_id', brand.id));
    }
  }, [brand]);
  console.log(form.getValues());
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
                onPress={onSelectCategory}
              />
            </View>
            <View className="gap-1 flex-1">
              <Label>Brand</Label>
              <SelectionButton
                value={selectedBrand?.name}
                label="Select brand"
                onPress={onSelectBrand}
              />
            </View>
          </View>
          <View className="gap-1">
            <Label>Title</Label>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState, formState }) => {
                return (
                  <Input
                    {...field}
                    placeholder="adidas og samba"
                    onChangeText={field.onChange}
                    error={Boolean(fieldState.error)}
                    errorMessage={fieldState?.error?.message}
                  />
                );
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
                    onChangeText={field.onChange}
                    error={Boolean(fieldState.error)}
                    errorMessage={fieldState?.error?.message}
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
          <Card className="mt-4 py-0">
            <CardContent className="p-2">
              {variations.length <= 0 ? (
                <Text className="text-center my-6">
                  No product variations added yet!
                </Text>
              ) : (
                variations.map((variant, index) => {
                  return (
                    <Fragment key={variant.variation_name}>
                      <VariantCard variant={variant} />
                      {index !== variations.length - 1 && (
                        <Separator className="my-1" />
                      )}
                    </Fragment>
                  );
                })
              )}
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
