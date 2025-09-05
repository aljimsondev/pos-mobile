import BrandSheet from '@/components/ui/bottom-sheet/brand.sheet';
import CategorySheet from '@/components/ui/bottom-sheet/category.sheet';
import { Fragment, ReactNode } from 'react';

export function AppSheetProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <CategorySheet />
      <BrandSheet />
    </Fragment>
  );
}
