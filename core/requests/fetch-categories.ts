import { ApiResponse, ListResponse } from '@/lib/types/response';
import { fetcher } from '@/lib/utils';
import { Category } from '@aljimsondev/database-schema';

interface CategoryListQuery {
  limit?: number;
  sort_by?: 'name';
  sort_order?: 'asc';
  page?: number;
  search?: string;
}

export const fetchCategories = async (
  params?: CategoryListQuery,
): Promise<Category[]> => {
  try {
    const response = await fetcher(`category/all`, {
      query: params as Record<any, string>,
    });

    const body = (await response.json()) as ApiResponse<ListResponse<Category>>;

    if (!body?.success) throw body?.error;

    return body?.data?.results;
  } catch (e) {
    console.warn('Error fetchProducts: Reason:' + JSON.stringify(e));

    return [];
  }
};
