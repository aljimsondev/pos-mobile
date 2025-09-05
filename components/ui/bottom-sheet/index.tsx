import BrandSheet from '@/components/ui/bottom-sheet/brand.sheet';
import CategorySheet from '@/components/ui/bottom-sheet/category.sheet';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Fragment, ReactNode } from 'react';

export const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);

export function AppSheetProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <CategorySheet />
      <BrandSheet />
    </Fragment>
  );
}
