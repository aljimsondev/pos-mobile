import SelectionButton from '@/components/ui/button/selection.button';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import React from 'react';
import { View } from 'react-native';

export default function ProductFilter() {
  const { open } = useBottomSheetStore();
  return (
    <View className="w-full flex flex-row items-center pr-2">
      <View className="flex flex-1 flex-row items-center justify-start gap-2 px-2">
        <SelectionButton label="Category" onPress={() => open('category')} />
        <SelectionButton label="Brand" onPress={() => open('brand')} />
      </View>
      <SelectionButton label="Advance Filter" />
    </View>
  );
}
