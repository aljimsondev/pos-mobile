import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useBrandStore } from '@/lib/store/brand-store';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { renderBackdrop } from './renderBackdrop';

function BrandSheet() {
  const ref = useRef<BottomSheetMethods | null>(null);
  const { brand, close } = useBottomSheetStore();
  useSheetBackHandler('brand');
  const { getBrands, brands } = useBrandStore();

  // initial fetch for brands
  useEffect(() => {
    const controller = new AbortController();
    getBrands(controller);

    return () => {
      controller.abort();
    };
  }, [getBrands]);

  // control sheet according to state changes
  useEffect(() => {
    if (brand) {
      ref.current?.expand();
    } else {
      ref.current?.close();
    }
  }, [brand]);

  const onChange = (props: any) => {
    if (props === -1) {
      close('brand');
    }
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['75%']}
      backdropComponent={renderBackdrop}
      onChange={onChange}
      enablePanDownToClose
      enableDynamicSizing={false}
    >
      <BottomSheetView className="px-4 h-full gap-2">
        <Text className="font-bold text-lg">Brands</Text>
        <Separator />
        <ScrollView style={{ flex: 1 }}>
          {new Array(1000).fill(0).map((_, index) => {
            return (
              <Text key={index}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam,
                molestiae!
              </Text>
            );
          })}
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default BrandSheet;
