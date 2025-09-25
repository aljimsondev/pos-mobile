import { ProductVariationSchema } from '@/lib/schema/product/create.product';
import { create } from 'zustand';

export interface CreateProductState {
  variations: ProductVariationSchema[];
}

export interface CreateProductStore extends CreateProductState {
  setVariant: (variation: ProductVariationSchema) => void;
  unsetVariant: (variatioName: string) => void;
}

const initialState: CreateProductState = {
  variations: [],
};

export const useCreateProductStore = create<CreateProductStore>((set, get) => ({
  ...initialState,
  setVariant: (variant: ProductVariationSchema) => {
    // check if variant is presen
    // add if not present while ignore of already added
    set((state) => {
      const existingVariant = state.variations.findIndex(
        (i) => i.variation_name === variant.variation_name,
      );
      // check if variant is not already added
      if (existingVariant !== -1) {
        return { ...state };
      }
      // copy the old state
      const oldCopy = state.variations;

      // push new variant
      oldCopy.push(variant);

      return {
        ...state,
        variations: oldCopy,
      };
    });
  },
  unsetVariant: (variatioName: string) => {
    set((state) => {
      return {
        ...state,
        variations: state.variations.filter(
          (variant) => variant.variation_name !== variatioName,
        ),
      };
    });
  },
}));
