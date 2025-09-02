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

export const fetchProducts = async (): Promise<ProductListResponse> => {
  try {
    const response = await fetcher('/product/list');

    const body = (await response.json()) as ApiResponse<ProductListResponse>;
    console.log(body);
    if (!body?.success) return defaultReturnData;
    return body.data;
  } catch (e) {
    console.warn('Error fetchProducts: Reason:' + e);
    return {
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
  }
};
