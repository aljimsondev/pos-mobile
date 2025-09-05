import SelectionButton from '@/components/ui/button/selection.button';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function CategoryScrollView() {
  const { open } = useBottomSheetStore();
  return (
    <View className="w-full flex flex-row items-center pr-2">
      <ScrollView
        horizontal
        contentContainerClassName="flex items-center justify-start gap-2 px-2 min-w-full"
      >
        <SelectionButton label="Category" onPress={() => open('category')} />
        <SelectionButton label="Brand" onPress={() => open('brand')} />
      </ScrollView>
      <SelectionButton label="Advance Filter" />
    </View>
  );
}
