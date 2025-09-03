import { ProductVariation } from '@/lib/types/product';
import { create } from 'zustand';

export interface VariationState {
  isOpen?: boolean;
  variant?: ProductVariation;
}

export interface VariantDialogStore extends VariationState {
  show: (dialog: Partial<VariationState>) => void;
  hide: () => void;
  reset: () => void;
}

const initialState: VariationState = {
  isOpen: false,
  variant: undefined,
};

export const useVariantDialogStore = create<VariantDialogStore>((set, get) => ({
  ...initialState,

  show: (dialog) => {
    set({
      ...dialog,
      isOpen: true,
    });
  },

  hide: () => {
    set({ isOpen: false });
  },

  reset: () => {
    set(initialState);
  },
}));
