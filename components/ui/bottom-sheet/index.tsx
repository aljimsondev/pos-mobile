import BrandSheet from '@/components/ui/bottom-sheet/brand.sheet';
import CategorySheet from '@/components/ui/bottom-sheet/category.sheet';
import MeasurementSheet from '@/components/ui/bottom-sheet/measurement.sheet';
import ProductVariantSheet from '@/components/ui/bottom-sheet/product-variant.sheet';
import ScannerSheet from '@/components/ui/bottom-sheet/scanner.sheet';
import VariationSheet from '@/components/ui/bottom-sheet/variant.sheet';
import { Fragment, ReactNode } from 'react';

export function AppSheetProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <VariationSheet />
      <ProductVariantSheet />
      <CategorySheet />
      <BrandSheet />
      <MeasurementSheet />
      <ScannerSheet />
    </Fragment>
  );
}
