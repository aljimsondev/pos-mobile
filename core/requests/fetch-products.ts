import { ApiResponse, ProductListResponse } from '@/lib/types/response';
import { fetcher } from '@/lib/utils';

const defaultReturnData = {
  pagination: {
    count: 0,
    has_next_page: false,
    has_prev_page: false,
    limit: 10,
    page: 1,
    total_pages: 1,
  },
  products: [],
};
export type ProductListQuery = {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  brandId?: string;
  categoryId?: string;
};

export const fetchProducts = async (
  params?: ProductListQuery,
): Promise<ProductListResponse> => {
  try {
    const response = await fetcher(`/product/list`, {
      query: params as Record<any, string>,
    });

    const body = (await response.json()) as ApiResponse<ProductListResponse>;

    if (!body?.success) throw body?.error;

    return body.data;
  } catch (e) {
    console.warn('Error fetchProducts: Reason:' + JSON.stringify(e));

    return defaultReturnData;
  }
};
