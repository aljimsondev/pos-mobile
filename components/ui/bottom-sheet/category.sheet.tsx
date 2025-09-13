import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useCategoryStore } from '@/lib/store/category-store';
import { THEME } from '@/lib/theme';
import { Category } from '@aljimsondev/database-schema';
import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useRef } from 'react';
import { FlatList, Pressable, useColorScheme, View } from 'react-native';
import { renderBackdrop } from './renderBackdrop';

function CategorySheet() {
  const ref = useRef<BottomSheetMethods | null>(null);
  const { category: categoryIsOpen, close, open } = useBottomSheetStore();
  const { getCategories, categories } = useCategoryStore();
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
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return <CategoryItem {...item} haveDescendants={index === 1} />;
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default CategorySheet;

interface CategoryNodeProps {
  isChild?: boolean;
  isRoot?: boolean;
  label?: string;
}

function CategoryNode({ label }: CategoryNodeProps) {
  return (
    <Pressable className="p-2 items-center active:bg-muted rounded-md flex-1 justify-start flex-row gap-2">
      <Checkbox id="category_checkbox" />
      <Text>{label}</Text>
    </Pressable>
  );
}

interface CategoryItemProps extends Category {
  haveDescendants?: boolean;
}
function CategoryItem({ haveDescendants, name, ...rest }: CategoryItemProps) {
  const theme = useColorScheme() as 'dark' | 'light';

  const iconColor = THEME[theme].primary;

  return (
    <View className="rounded-md flex items-center flex-row gap-2">
      <CategoryNode label={name} />
      {haveDescendants && (
        <Pressable className="active:bg-muted rounded-full p-2">
          <Feather name="chevron-down" size={24} color={iconColor} />
        </Pressable>
      )}
    </View>
  );
}
