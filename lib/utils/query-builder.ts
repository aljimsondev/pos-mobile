// Generic query builder function
export const buildQueryString = (params: Record<string, any>): string => {
  const queryParams: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    // Only add parameters that have valid values
    if (value !== undefined && value !== null && value !== '') {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value.toString());
      queryParams.push(`${encodedKey}=${encodedValue}`);
    }
  });

  return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
};
