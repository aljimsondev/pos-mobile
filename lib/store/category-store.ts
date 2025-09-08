import { fetchCategories } from '@/core/requests/fetch-categories';
import { Category } from '@aljimsondev/database-schema';
import { create } from 'zustand';

interface CategoryState {
  categories: Category[];
}

interface CategoryStore extends CategoryState {
  getCategories: (controller: AbortController) => void;
}

const initialState: CategoryState = {
  categories: [],
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  ...initialState,
  getCategories: async (controller: AbortController) => {
    const results = await fetchCategories(
      {
        limit: 0,
      },
      {
        signal: controller.signal,
      },
    );

    set({
      categories: results,
    });
  },
}));
