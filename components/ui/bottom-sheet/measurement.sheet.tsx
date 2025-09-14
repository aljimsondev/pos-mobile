import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/reusable/accordion';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import { renderBackdrop } from '@/components/ui/bottom-sheet/renderBackdrop';
import AppCheckbox from '@/components/ui/checkbox';
import { unit_of_measurement } from '@/constants/unit-of-measurement';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useCategoryStore } from '@/lib/store/category-store';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';

function MeasurementSheet() {
  const { measurement, close } = useBottomSheetStore();
  const { selectedCategory, setSelectedCategory, unsetSelectedCategory } =
    useCategoryStore();
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
                            <AppCheckbox
                              label={unit.name}
                              key={unit.code}
                              checked={selectedCategory?.code === unit.code}
                              onCheckChange={() => {
                                setSelectedCategory(unit);
                              }}
                            />
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
