import SelectionButton from '@/components/ui/button/selection.button';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import React from 'react';
import { View } from 'react-native';

export default function ProductFilter() {
  const { open, category, close, brand } = useBottomSheetStore();

  return (
    <View className="w-full flex flex-row items-center pr-2">
      <View className="flex flex-1 flex-row items-center justify-start gap-2 px-2">
        <SelectionButton
          label="Category"
          onPress={() => {
            if (category) {
              close('category');
            } else {
              open('category');
            }
          }}
        />
        <SelectionButton
          label="Brand"
          onPress={() => {
            if (brand) {
              close('brand');
            } else {
              open('brand');
            }
          }}
        />
      </View>
      <SelectionButton label="Advance Filter" />
    </View>
  );
}
