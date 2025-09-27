import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import { CategoryItem } from '@/components/ui/card/CategoryItem';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useCategoryStore } from '@/lib/store/category-store';
import { Category } from '@aljimsondev/database-schema';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { renderBackdrop } from './renderBackdrop';

function CategorySheet() {
  const ref = useRef<BottomSheetMethods | null>(null);
  const { category: categoryIsOpen, close } = useBottomSheetStore();
  const {
    getCategories,
    categories,
    setSelectedCategory,
    selectedCategory,
    callback,
  } = useCategoryStore();
  useSheetBackHandler('category');

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller);

    return () => {
      controller.abort();
    };
  }, [getCategories]);

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

  const onSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    // run the callback
    if (callback) {
      callback(category);
    }
    close('category'); // close the sheet
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
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const selected = item.id === selectedCategory?.id;
            return (
              <CategoryItem
                onPress={() => onSelectCategory(item)}
                selected={selected}
                {...item}
              />
            );
          }}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

export default CategorySheet;
