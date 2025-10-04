import { Button } from '@/components/reusable/button';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import PhotoButton from '@/components/ui/button/PhotoButton';
import SelectionButton from '@/components/ui/button/selection.button';
import PhotoCard from '@/components/ui/card/PhotoCard';
import IconButton from '@/components/ui/IconButton';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { productVariationSchema } from '@/lib/schema/product/create.product';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useCreateProductStore } from '@/lib/store/create-product-store';
import { useUnitMeasurementStore } from '@/lib/store/measurement-store';
import { useScannerStore } from '@/lib/store/scanner-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Toast } from 'toastify-react-native';
import { renderBackdrop } from './renderBackdrop';

interface ProductVariantSheetProps {}

function ProductVariantSheet({}: ProductVariantSheetProps) {
  const ref = useRef<BottomSheetMethods | null>(null);
  const {
    close,
    open,
    barcodeScanner,
    createProductVariation: openSheet,
  } = useBottomSheetStore();
  const { selectedMeasurement } = useUnitMeasurementStore();
  useSheetBackHandler('createProductVariation');
  const { onScanSuccess } = useScannerStore();
  const { setVariant, variations } = useCreateProductStore();

  const form = useForm({
    resolver: zodResolver(productVariationSchema),
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
      close('createProductVariation');
    }
  };

  const onOpenScanner = () => {
    // this will ensure that the sheet will toggle even the user spam on click
    if (barcodeScanner) {
      close('barcodeScanner');
    } else {
      open('barcodeScanner');
    }

    // passed the callback
    onScanSuccess((result: any) => {
      // set the value
      form.setValue('barcode', result);
    });
  };

  const handleAddVariation = form.handleSubmit(async (data) => {
    try {
      if (!selectedMeasurement)
        throw new Error('Unit of measurement is required!');

      setVariant({
        ...data,
        unit_of_measurement: selectedMeasurement.name || '',
      });

      // reset form
      form.reset();
      // close the bottom sheet
      close('createProductVariation');
    } catch (e: any) {
      console.warn(e);
      Toast.error(e?.message || 'Something went wrong!');
    }
  });

  const photo = form.watch('photo');

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
        <Text className="font-bold text-lg">Add production variation</Text>
        <Separator />
        <ScrollView>
          <View className="flex-row gap-2">
            <View className="gap-1 flex-1">
              <Label>Unit of measurement</Label>
              <SelectionButton
                label="Measurement"
                onPress={() => open('measurement')}
                value={selectedMeasurement?.name}
              />
            </View>
            <View className="gap-1 flex-1">
              <Label>Unit price</Label>
              <Controller
                name="unit_price"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      {...field}
                      placeholder="1000"
                      keyboardType="numeric"
                      value={field.value?.toString()}
                      error={Boolean(fieldState.error)}
                      errorMessage={fieldState?.error?.message}
                      onChangeText={field.onChange}
                    />
                  );
                }}
              />
            </View>
          </View>
          <View className="gap-1 flex-1 mt-4">
            <Label>Variation name</Label>
            <Controller
              name="variation_name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    placeholder="1000"
                    error={Boolean(fieldState.error)}
                    errorMessage={fieldState?.error?.message}
                    onChangeText={field.onChange}
                  />
                );
              }}
            />
          </View>
          <View className="gap-1 flex-1 mt-4">
            <Label>Barcode</Label>
            <View className="flex-row gap-1">
              <View className="flex-1">
                <Controller
                  name="barcode"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Input
                        {...field}
                        placeholder="1000"
                        error={Boolean(fieldState.error)}
                        errorMessage={fieldState?.error?.message}
                        onChangeText={field.onChange}
                      />
                    );
                  }}
                />
              </View>
              <IconButton
                onPress={onOpenScanner}
                icon={(color) => (
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={24}
                    color={color}
                  />
                )}
              />
            </View>
          </View>
          <View className="gap-1 flex-1 mt-4">
            <Label>Photo ({photo ? '1' : '0'}/1)</Label>
            <View className="items-center justify-start flex-row gap-2">
              {photo ? (
                <PhotoCard
                  uri={photo.uri}
                  onRemovePhoto={() => form.setValue('photo', '')}
                />
              ) : (
                <PhotoButton
                  onSelectImage={(result) => {
                    if (!result.canceled) {
                      const file = result.assets[0];
                      form.setValue('photo', file);
                    }
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <Button className="mb-4" onPress={handleAddVariation}>
          <Text>Add variation</Text>
        </Button>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default ProductVariantSheet;
