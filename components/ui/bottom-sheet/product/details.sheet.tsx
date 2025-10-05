import { Button } from '@/components/reusable/button';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { createProductFormSchema } from '@/lib/schema/product/create.product';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useUnitMeasurementStore } from '@/lib/store/measurement-store';
import { useProductStore } from '@/lib/store/product-store';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Toast } from 'toastify-react-native';
import { renderBackdrop } from '../renderBackdrop';

interface ProductDetailSheetProps {}

function ProductDetailSheet(props: ProductDetailSheetProps) {
  const ref = useRef<BottomSheetMethods | null>(null);
  const {
    close,
    open,
    barcodeScanner,
    productDetails: openSheet,
  } = useBottomSheetStore();
  const { selectedMeasurement } = useUnitMeasurementStore();
  useSheetBackHandler('productDetails');
  const { selectedProduct, unsetProduct } = useProductStore();

  const form = useForm({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {},
    mode: 'all',
  });

  // control sheet according to state changes
  useEffect(() => {
    if (openSheet) {
      ref.current?.expand();
    } else {
      ref.current?.close();
    }
  }, [openSheet]);

  const onChange = (props: any) => {
    if (props === -1) {
      close('productDetails');
      unsetProduct(); // reset product on close
    }
  };

  const handleUpdateDetails = form.handleSubmit(async (data) => {
    try {
      // todo handle
      // close the bottom sheet
      close('productDetails');
    } catch (e: any) {
      console.warn(e);
      Toast.error(e?.message || 'Something went wrong!');
    }
  });

  console.log(selectedProduct);

  return (
    <BottomSheet
      index={-1}
      ref={ref}
      snapPoints={['75%']}
      backdropComponent={renderBackdrop}
      onChange={onChange}
      enablePanDownToClose
      enableDynamicSizing={false}
      style={{ zIndex: 9999 }}
    >
      <BottomSheetView className="px-4 h-full flex gap-2">
        <Text className="font-bold text-lg">Product details</Text>
        <Separator />
        <ScrollView>
          <View className="gap-1 flex-1 mt-4">
            <Label>Name</Label>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    placeholder="ex. adidas"
                    value={field.value?.toString()}
                    error={Boolean(fieldState.error)}
                    errorMessage={fieldState?.error?.message}
                    onChangeText={field.onChange}
                  />
                );
              }}
            />
          </View>
          <View className="gap-1 flex-1 mt-4">
            <Label>Description</Label>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    placeholder="Product description..."
                    value={field.value?.toString()}
                    error={Boolean(fieldState.error)}
                    errorMessage={fieldState?.error?.message}
                    onChangeText={field.onChange}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
        <Button className="mb-4" onPress={handleUpdateDetails}>
          <Text>Update product</Text>
        </Button>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default ProductDetailSheet;
