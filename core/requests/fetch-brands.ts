import { ApiResponse, BrandListResponse } from '@/lib/types/response';
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
  results: [],
};

export type BrandListQuery = {
  limit?: number;
  page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
};

export const fetchBrands = async (
  params: BrandListQuery,
  options: RequestInit = {},
) => {
  try {
    const { signal } = options;
    const response = await fetcher(`/brand/all`, {
      query: params as Record<any, string>,
      signal: signal,
    });

    const body = (await response.json()) as ApiResponse<BrandListResponse>;

    if (!body?.success) throw body?.error;

    return body.data;
  } catch (e) {
    console.warn('Error fetchBrands: Reason:' + JSON.stringify(e));

    return defaultReturnData;
  }
};
