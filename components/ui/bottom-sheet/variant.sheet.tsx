import { Button } from '@/components/reusable/button';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import SelectionButton from '@/components/ui/button/selection.button';
import IconButton from '@/components/ui/IconButton';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { productVariationSchema } from '@/lib/schema/product/create.product';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
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
import { renderBackdrop } from './renderBackdrop';

function VariationSheet() {
  const ref = useRef<BottomSheetMethods | null>(null);
  const {
    close,
    createProductVariation: openSheet,
    open,
    barcodeScanner,
  } = useBottomSheetStore();
  const { selectedMeasurement } = useUnitMeasurementStore();
  useSheetBackHandler('createProductVariation');
  const { onScanSuccess } = useScannerStore();

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

  return (
    <BottomSheet
      index={-1}
      ref={ref}
      snapPoints={['75%']}
      backdropComponent={renderBackdrop}
      onChange={onChange}
      enablePanDownToClose
      enableDynamicSizing={false}
    >
      <BottomSheetView className="px-4 h-full flex gap-2">
        <Text className="font-bold text-lg">Add production variation</Text>
        <Separator />
        <ScrollView>
          <View className="flex-row gap-2">
            <View className="gap-1 flex-1">
              <Label>Unit of measurement</Label>
              <SelectionButton
                label="Unit of measurement"
                onPress={() => open('measurement')}
                value={selectedMeasurement?.name}
              />
            </View>
            <View className="gap-1 flex-1">
              <Label>Unit price</Label>
              <Controller
                name="variation_name"
                control={form.control}
                render={({ field, fieldState, formState }) => {
                  return <Input {...field} placeholder="1000" />;
                }}
              />
            </View>
          </View>
          <View className="gap-1 flex-1 mt-4">
            <Label>Barcode</Label>
            <View className="flex-row gap-1">
              <Controller
                name="variation_name"
                control={form.control}
                render={({ field, fieldState, formState }) => {
                  return (
                    <Input {...field} placeholder="1000" className="flex-1" />
                  );
                }}
              />
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
        </ScrollView>
        <Button className="mb-4">
          <Text>Add variation</Text>
        </Button>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default VariationSheet;
