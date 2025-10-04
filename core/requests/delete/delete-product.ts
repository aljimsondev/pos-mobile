import { ApiResponse } from '@/lib/types/response';
import { fetcher } from '@/lib/utils';

export const deleteProduct = async (id: string) => {
  try {
    const response = await fetcher(`/product/${id}`, {
      method: 'DELETE',
    });

    const body = (await response.json()) as ApiResponse<{ id: string }>;

    if (!body?.success) throw body?.error;

    return body.data;
  } catch (e) {
    throw e;
  }
};
