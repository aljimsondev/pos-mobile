import { fetchCategories } from '@/core/requests/fetch-categories';
import { Category } from '@aljimsondev/database-schema';
import { create } from 'zustand';

interface CategoryState {
  categories: Category[];
  selectedCategory: string;
}

interface CategoryStore extends CategoryState {
  getCategories: (controller: AbortController) => void;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: '',
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
  setSelectedCategory: (category: string) => {
    if (!category) return;
    set({
      selectedCategory: category,
    });
  },

  unsetSelectedCategory: () => {
    set({
      selectedCategory: '',
    });
  },

  unsetCategories: () => {
    set({
      categories: [],
    });
  },
}));
