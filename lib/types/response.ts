import { Product } from '@/lib/types/product';

export type ApiResponse<T = any> = {
  success: boolean;
  status: number;
  data: T;
  error?: Record<string, any>;
};

export type ProductListResponse = {
  pagination: {
    count: number;
    has_next_page: boolean;
    has_prev_page: boolean;
    limit: number;
    page: number;
    total_pages: number;
  };
  products: Product[];
};
