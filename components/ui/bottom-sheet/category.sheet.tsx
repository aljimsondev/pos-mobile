import { Text } from '@/components/reusable/text';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useRef } from 'react';

function CategorySheet() {
  const ref = useRef<BottomSheetMethods | null>(null);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['50%']}
      backdropComponent={renderBackdrop}
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
