import BrandSheet from '@/components/ui/bottom-sheet/brand.sheet';
import CategorySheet from '@/components/ui/bottom-sheet/category.sheet';
import MeasurementSheet from '@/components/ui/bottom-sheet/measurement.sheet';
import VariationSheet from '@/components/ui/bottom-sheet/variant.sheet';
import { Fragment, ReactNode } from 'react';

export function AppSheetProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <VariationSheet />
      <CategorySheet />
      <BrandSheet />
      <MeasurementSheet />
    </Fragment>
  );
}
