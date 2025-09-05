import { Text } from '@/components/reusable/text';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useEffect, useRef } from 'react';

function CategorySheet() {
  const ref = useRef<BottomSheetMethods | null>(null);
  const { category: categoryIsOpen, close } = useBottomSheetStore();

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
      snapPoints={['50%']}
      backdropComponent={renderBackdrop}
      onChange={onChange}
    >
      <BottomSheetView className="flex-1">
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}

export default CategorySheet;

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);
