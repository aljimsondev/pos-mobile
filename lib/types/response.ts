import { Product, ProductVariation } from '@/lib/types/product';
import { Brand } from '@aljimsondev/database-schema';

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

export type ListResponse<T> = {
  pagination: {
    count: number;
    has_next_page: boolean;
    has_prev_page: boolean;
    limit: number;
    page: number;
    total_pages: number;
  };
  results: T[];
};

export type ProductVariationResponse = ListResponse<ProductVariation>;

export type BrandListResponse = {
  pagination: {
    count: number;
    has_next_page: boolean;
    has_prev_page: boolean;
    limit: number;
    page: number;
    total_pages: number;
  };
  results: Brand[];
};
