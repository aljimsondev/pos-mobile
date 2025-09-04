import { APP_CONFIG } from '@/constants/config';
import { ProductVariation } from '@/lib/types/product';
import { create } from 'zustand';

export type CartProduct = ProductVariation & {
  productName: string;
  selected?: boolean;
};

type BaseItemActionParams = {
  productId: string;
  variationId?: string;
};

type UpdateItemParams = {
  productId: string;
  variationId: string;
  updates: Partial<CartProduct>;
};

export interface CartState {
  items: CartProduct[];
}

export interface CartStore extends CartState {
  add: (product: CartProduct) => void;
  remove: (params: BaseItemActionParams) => void;
  update: (params: UpdateItemParams) => void;
  removeSelectedItems: () => void;
  toggleItemSelection: (productId: string, variationId: string) => void;
  toggleAllSelection: (selected: boolean) => void;
  incrementItemSelectionQuantity: (params: BaseItemActionParams) => void;
  decrementItemSelectionQuantity: (params: BaseItemActionParams) => void;
  clear: () => void;
}

const initialState: CartState = {
  items: [],
};

export const useCartStore = create<CartStore>((set, get) => ({
  ...initialState,
  add: (product: CartProduct) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id && item.id === product.id,
      );

      if (existingItemIndex !== -1) {
        // Product exists, increment quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
        };
      }

      // Product doesn't exist, add new item with quantity 1
      return {
        ...state,
        items: [...state.items, { ...product, selected: true }],
      };
    });
  },
  // Remove item from cart
  remove: ({ productId, variationId }: BaseItemActionParams) => {
    set((state) => ({
      ...state,
      items: state.items.filter(
        (item) =>
          !(
            item.id === productId &&
            (variationId === undefined || item.id === variationId)
          ),
      ),
    }));
  },
  // Update item quantity or properties
  update: ({ productId, updates, variationId }: UpdateItemParams) => {
    set((state) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === productId && item.id === variationId,
      );

      if (itemIndex === -1) return state; // Item not found

      // If quantity is being updated to 0 or less, remove the item
      if (updates.quantity !== undefined && updates.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((_, index) => index !== itemIndex),
        };
      }

      // Update the item
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        ...updates,
      };

      return {
        ...state,
        items: updatedItems,
      };
    });
  },
  // Clear entire cart
  clear: () => {
    set((state) => ({
      ...state,
      items: [],
    }));
  },

  // Increment quantity
  incrementItemSelectionQuantity: ({
    productId,
    variationId,
  }: BaseItemActionParams) => {
    set((state) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === variationId && item.product_id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    }));
  },

  // Increment quantity
  decrementItemSelectionQuantity: ({
    productId,
    variationId,
  }: BaseItemActionParams) => {
    set((state) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === variationId && item.product_id === productId
          ? {
              ...item,
              quantity:
                item.quantity <= 1
                  ? 1 //default to 1
                  : item.quantity - 1, // decrement quantity
            }
          : item,
      ),
    }));
  },

  // Remove selected items
  removeSelectedItems: () => {
    set((state) => ({
      ...state,
      items: state.items.filter((item) => !item.selected),
    }));
  },

  // Toggle item selection
  toggleItemSelection: (productId: string, variationId: string) => {
    set((state) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === variationId && item.product_id === productId
          ? { ...item, selected: !item.selected }
          : item,
      ),
    }));
  },

  // Select/deselect all items
  toggleAllSelection: (selected: boolean) => {
    set((state) => ({
      ...state,
      items: state.items.map((item) => ({
        ...item,
        selected,
      })),
    }));
  },
}));

// Helper selectors (computed values)
export const useCartSelectors = () => {
  const vatRate = APP_CONFIG.fees.VAT_RATE;

  const items = useCartStore((state) => state.items);

  const calculateSubtotal = () => {
    return items.reduce(
      (sum, item) => sum + Number(item.unit_price || 0) * item.quantity,
      0,
    );
  };

  const calculateVAT = () => {
    return subTotal * vatRate;
  };

  const subTotal = calculateSubtotal();
  const vat = calculateVAT();

  const calculateTotal = () => {
    return subTotal + vat;
  };

  return {
    // Total items count
    totalItems: items.length,

    // Subtotal price
    subTotal,

    // Calculated value add tax price
    vat,

    // Total price
    totalPrice: calculateTotal(),

    // Selected items
    selectedItems: items.filter((item) => item.selected),

    // Selected items count
    selectedCount: items.filter((item) => item.selected).length,

    // Check if all items are selected
    isAllSelected: items.length > 0 && items.every((item) => item.selected),

    // Check if cart is empty
    isEmpty: items.length === 0,
  };
};
