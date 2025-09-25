import { create } from 'zustand';

export interface ScannerState {
  // a function that trigger after the scan succeeded
  callbackOnSuccess: ((result: any) => void) | null;
}

export interface ScannerStore extends ScannerState {
  onScanSuccess: (callback: (result: any) => void) => void;
}

const initialState: ScannerState = {
  callbackOnSuccess: null,
};

export const useScannerStore = create<ScannerStore>((set, get) => ({
  ...initialState,
  onScanSuccess: (cb: (result: any) => void) => {
    set({
      callbackOnSuccess: cb,
    });
  },
}));
