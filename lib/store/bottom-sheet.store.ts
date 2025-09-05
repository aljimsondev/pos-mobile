import { create } from 'zustand';

interface BottomSheetState {
  category: boolean;
  brand: boolean;
}

type SheetName = keyof BottomSheetState;

interface BottomSheetStore extends BottomSheetState {
  open: (sheetName: SheetName) => void;
  close: (sheetName: SheetName) => void;
}

const initialState: BottomSheetState = {
  brand: false,
  category: false,
};

export const useBottomSheetStore = create<BottomSheetStore>((set, get) => ({
  ...initialState,
  open: (sheetName) => {
    return set({
      [sheetName]: true,
    });
  },
  close: (sheetName) => {
    return set({
      [sheetName]: false,
    });
  },
}));
