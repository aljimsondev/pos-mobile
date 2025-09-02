/**
 * Helper function to construct the correct image URL
 * Removes '/public' from the path when present and prepends the API base URL
 *
 * @param {string} imageUrl - The image URL from the product data
 * @returns {string} - The properly formatted image URL
 */
export const getImageUrl = (imageUrl: string) => {
  if (!imageUrl) {
    return ''; // or return a default placeholder image URL
  }

  // If the URL starts with '/public', remove '/public' and prepend the API URL
  if (imageUrl.startsWith('/public')) {
    const pathWithoutPublic = imageUrl.replace('/public', '');
    return `${process.env.EXPO_PUBLIC_API_URL}${pathWithoutPublic}`;
  }

  // If it's already a full URL, return as is
  return imageUrl;
};

// Usage example:
// const photoUrl = getImageUrl(product.photo.url);
