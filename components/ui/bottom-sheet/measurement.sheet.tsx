import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import { renderBackdrop } from '@/components/ui/bottom-sheet/renderBackdrop';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

function MeasurementSheet() {
  const { measurement, close } = useBottomSheetStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  useSheetBackHandler('measurement');

  // control sheet according to state changes
  useEffect(() => {
    if (measurement) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [measurement]);

  const onChange = useCallback(
    (props: any) => {
      if (props === -1) {
        close('measurement');
      }
    },
    [close],
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        name="measurement"
        snapPoints={['75%']}
        backdropComponent={renderBackdrop}
        onChange={onChange}
        enablePanDownToClose
        enableDynamicSizing={false}
        ref={bottomSheetModalRef}
      >
        <BottomSheetView className="flex-1 px-4">
          <Text className="font-bold text-lg">Unit of measurement</Text>
          <Separator />
          <ScrollView className="flex-1"></ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
      {/* <BottomSheet
        index={-1}
        ref={ref}
        snapPoints={['75%']}
        backdropComponent={renderBackdrop}
        onChange={onChange}
        enablePanDownToClose
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1">
          <Text className="font-bold text-lg">Unit of measurement</Text>
          <Separator />
          <ScrollView className="flex-1"></ScrollView>
        </BottomSheetView>
      </BottomSheet> */}
    </BottomSheetModalProvider>
  );
}

export default MeasurementSheet;
