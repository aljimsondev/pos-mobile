import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useEffect, useRef } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { renderBackdrop } from './renderBackdrop';

function CategorySheet() {
  const ref = useRef<BottomSheetMethods | null>(null);
  const { category: categoryIsOpen, close, open } = useBottomSheetStore();

  // control sheet according to state changes
  useEffect(() => {
    if (categoryIsOpen) {
      ref.current?.expand();
    } else {
      ref.current?.close();
    }
  }, [categoryIsOpen]);

  const onChange = (props: any) => {
    if (props === -1) {
      close('category');
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
      <BottomSheetView className="px-4 h-full flex gap-2">
        <Text className="font-bold text-lg">Categories</Text>
        <Separator />
        <View className="flex-1">
          <FlatList
            data={new Array(10)}
            renderItem={(item) => {
              return (
                <TouchableOpacity className="p-2 my-[2px] rounded-md">
                  <View className="flex-1 ">
                    <Text>Category</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default CategorySheet;
