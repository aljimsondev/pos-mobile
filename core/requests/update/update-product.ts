import { CreateProductFormSchema } from '@/lib/schema/product/create.product';
import { ApiResponse } from '@/lib/types/response';
import { fetcher } from '@/lib/utils';

export const updateProduct = async (
  id: string,
  data: Partial<CreateProductFormSchema>,
): Promise<ApiResponse> => {
  try {
    const result = await fetcher(`/product/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    const responseData = await result.json();
    if (!responseData?.success)
      throw new Error(responseData?.error?.message || 'API Response error!');

    return responseData as ApiResponse;
  } catch (e) {
    throw e;
  }
};
