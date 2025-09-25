import AppScanner from '@/components/ui/Scanner';
import useSheetBackHandler from '@/hooks/useSheetBackHandler';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useBrandStore } from '@/lib/store/brand-store';
import { Brand } from '@aljimsondev/database-schema';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useEffect, useRef } from 'react';
import { renderBackdrop } from './renderBackdrop';

export default function ScannerSheet() {
  const ref = useRef<BottomSheetMethods | null>(null);
  const { close, barcodeScanner } = useBottomSheetStore();
  useSheetBackHandler('barcodeScanner');
  const { getBrands, brands, setSelectedBrand, selectedBrand } =
    useBrandStore();

  // initial fetch for brands
  useEffect(() => {
    const controller = new AbortController();
    getBrands(controller);

    return () => {
      controller.abort();
    };
  }, [getBrands]);

  // control sheet according to state changes
  useEffect(() => {
    if (barcodeScanner) {
      ref.current?.expand();
    } else {
      ref.current?.close();
    }
  }, [barcodeScanner]);

  const onChange = (props: any) => {
    if (props === -1) {
      close('barcodeScanner');
    }
  };

  const onSelectBrand = (brand: Brand) => {
    if (brand) {
      setSelectedBrand(brand);
      close('barcodeScanner');
    }
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={['100%']}
      backdropComponent={renderBackdrop}
      onChange={onChange}
      enablePanDownToClose
      enableDynamicSizing={false}
    >
      <BottomSheetView className="h-full">
        <AppScanner />
      </BottomSheetView>
    </BottomSheet>
  );
}
