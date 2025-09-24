import { fetchCategories } from '@/core/requests/fetch-categories';
import { Category } from '@aljimsondev/database-schema';
import { create } from 'zustand';

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
}

interface CategoryStore extends CategoryState {
  getCategories: (controller: AbortController) => void;
  setSelectedCategory: (category: Category) => void;
  unsetSelectedCategory: () => void;
  unsetCategories: () => void;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
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
  setSelectedCategory: (category: Category) => {
    if (!category) return;
    set({
      selectedCategory: category,
    });
  },

  unsetSelectedCategory: () => {
    set({
      selectedCategory: null,
    });
  },

  unsetCategories: () => {
    set({
      categories: [],
    });
  },
}));
