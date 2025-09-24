import { fetchBrands } from '@/core/requests/fetch-brands';
import { Brand } from '@aljimsondev/database-schema';
import { create } from 'zustand';

interface BrandState {
  brands: Brand[];
  selectedBrand: Brand | null;
}

interface CategoryStore extends BrandState {
  getBrands: (controller: AbortController) => void;
  setSelectedBrand: (brand: Brand) => void;
  unsetSelectedBrand: () => void;
  unsetBrands: () => void;
}

const initialState: BrandState = {
  brands: [],
  selectedBrand: null,
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
