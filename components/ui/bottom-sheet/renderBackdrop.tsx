import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

export const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);
