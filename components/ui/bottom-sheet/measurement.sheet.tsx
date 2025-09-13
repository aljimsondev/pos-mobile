import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/reusable/accordion';
import { Label } from '@/components/reusable/label';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import { renderBackdrop } from '@/components/ui/bottom-sheet/renderBackdrop';
import { unit_of_measurement } from '@/constants/unit-of-measurement';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Checkbox from 'expo-checkbox';
import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';

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
          <BottomSheetScrollView className="flex-1">
            <Accordion type="single" collapsible>
              {Object.entries(unit_of_measurement).map(([key, val]) => {
                return (
                  <AccordionItem value={key} key={key}>
                    <AccordionTrigger>
                      <Text>{key}</Text>
                    </AccordionTrigger>
                    <AccordionContent>
                      <View className="gap-2">
                        {val.map((unit) => {
                          return (
                            <View
                              className="flex flex-row items-center gap-3"
                              key={unit.code}
                            >
                              <Checkbox id={unit.code} />
                              <Label onPress={() => {}} htmlFor={unit.code}>
                                {unit.name}
                              </Label>
                            </View>
                          );
                        })}
                      </View>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export default MeasurementSheet;
