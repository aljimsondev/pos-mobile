import { Text } from '@/components/reusable/text';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useEffect, useRef } from 'react';
import { renderBackdrop } from './renderBackdrop';

function BrandSheet() {
  const ref = useRef<BottomSheetMethods | null>(null);
  const { brand, close } = useBottomSheetStore();
  useSheetBackHandler('brand');

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
      index={-1}
      ref={ref}
      snapPoints={['75%']}
      backdropComponent={renderBackdrop}
      onChange={onChange}
      enablePanDownToClose
      enableDynamicSizing={false}
    >
      <BottomSheetView className="flex-1">
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default BrandSheet;
