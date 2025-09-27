import { fetchBrands } from '@/core/requests/fetch-brands';
import { Brand } from '@aljimsondev/database-schema';
import { create } from 'zustand';

interface BrandState {
  brands: Brand[];
  selectedBrand: Brand | null;
  /**
   * A Callback function to be called after selecting the brand
   */
  callback: ((selectedCategory: Brand) => void) | null;
}

interface CategoryStore extends BrandState {
  getBrands: (controller: AbortController) => void;
  setSelectedBrand: (brand: Brand) => void;
  unsetSelectedBrand: () => void;
  unsetBrands: () => void;
  setCallback: (callback: (brand: Brand) => void) => void;
  unsetCallback: () => void;
}

const initialState: BrandState = {
  brands: [],
  selectedBrand: null,
  callback: null,
};

export const useBrandStore = create<CategoryStore>((set, get) => ({
  ...initialState,
  getBrands: async (controller: AbortController) => {
    const results = await fetchBrands(
      {
        limit: 0,
      },
      {
        signal: controller.signal,
      },
    );

    set({
      brands: results.results,
    });
  },
  setSelectedBrand: (brand: Brand) => {
    if (!brand) return;
    set({
      selectedBrand: brand,
    });
  },
  setCallback: (callback: (brand: Brand) => void) => {
    set({ callback: callback });
  },
  unsetCallback: () => {
    set({ callback: null });
  },
  unsetSelectedBrand: () => {
    set({
      selectedBrand: null,
    });
  },

  unsetBrands: () => {
    set({
      brands: [],
    });
  },
}));
