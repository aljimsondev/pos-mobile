import { ProductVariation } from '@/lib/types/product';
import { create } from 'zustand';

type CartProduct = ProductVariation & { purchaseQuantity: number };

export interface CartState {
  items: CartProduct[];
}

export interface CartStore extends CartState {
  add: () => void;
  remove: () => void;
  update: (id: string, updates: Partial<CartProduct>) => void;
}

const initialState: CartState = {
  items: [],
};

export const useCartStore = create<CartStore>((set, get) => ({
  ...initialState,
  add: () => {},
  remove: () => {},
  update: () => {},
}));
