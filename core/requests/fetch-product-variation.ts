import { ApiResponse, ProductVariationResponse } from '@/lib/types/response';
import { fetcher } from '@/lib/utils';

export type FetchVariationParams = {
  page?: number;
  min_price?: number;
  max_price?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
};

export const fetchProductVariations = async ({
  params,
  productId,
}: {
  productId: string;
  params?: FetchVariationParams;
}) => {
  try {
    const response = await fetcher(`/product/${productId}/variations`, {
      query: params as Record<any, string>,
    });

    const body =
      (await response.json()) as ApiResponse<ProductVariationResponse>;

    if (!body?.success) throw body?.error;

    return body.data;
  } catch (e) {
    console.warn('Error fetchProducts: Reason:' + JSON.stringify(e));

    return {
      pagination: {
        count: 0,
        has_next_page: false,
        has_prev_page: false,
        limit: 10,
        page: 1,
        total_pages: 0,
      },
      results: [],
    };
  }
};
