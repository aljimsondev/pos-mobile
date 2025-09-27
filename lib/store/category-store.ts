import { fetchCategories } from '@/core/requests/fetch-categories';
import { Category } from '@aljimsondev/database-schema';
import { create } from 'zustand';

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  /**
   * A Callback function to be called after selecting the category
   */
  callback: ((selectedCategory: Category) => void) | null;
}

interface CategoryStore extends CategoryState {
  getCategories: (controller: AbortController) => void;
  setSelectedCategory: (category: Category) => void;
  unsetSelectedCategory: () => void;
  unsetCategories: () => void;
  setCallback: (callback: (category: Category) => void) => void;
  unsetCallback: () => void;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  callback: null,
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
  setCallback: (callback: (category: Category) => void) => {
    console.log('Callback init is called!');
    set({ callback: callback });
  },
  unsetCallback: () => {
    set({ callback: null });
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
