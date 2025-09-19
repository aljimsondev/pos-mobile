import { ApiResponse } from '@/lib/types/response';
import { fetcher } from '@/lib/utils';
import { Brand } from '@aljimsondev/database-schema';

export const fetchBrand = async (id: string) => {
  try {
    const response = await fetcher(`/brand/${id}`);

    const body = (await response.json()) as ApiResponse<Brand>;

    if (!body?.success) throw body?.error;

    return body.data;
  } catch (e) {
    console.warn('Error fetchBrand: Reason:' + JSON.stringify(e));
    return null;
  }
};
