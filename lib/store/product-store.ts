import { Product } from '@/lib/types/product';
import { create } from 'zustand';

export interface ProductState {
  selectedProduct: Product | null;
}

export interface ProductStore extends ProductState {
  setProduct: (product: Product) => void;
  unsetProduct: () => void;
}

const initialState: ProductState = {
  selectedProduct: null,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,
  // for selecting specific product
  setProduct: (product: Product) => {
    set({
      selectedProduct: product,
    });
  },
  // for deselecting specific product and set the value to null
  unsetProduct: () => {
    set({ selectedProduct: null });
  },
}));
