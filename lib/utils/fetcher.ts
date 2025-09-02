import { authClient } from '@/lib/auth/client';
import { buildQueryString } from '@/lib/utils/query-builder';

/**
 * A wrapper around the native fetch API that automatically prepends the base API URL
 * and formats endpoints consistently.
 *
 * @param endpoint - The API endpoint path (e.g., '/users', 'posts/123', '/api/auth')
 * @param options - Optional fetch configuration object containing headers, method, body, etc.
 * @returns A Promise that resolves to the Response object from the fetch API
 *
 * @throws {TypeError} When the endpoint is not a string or is empty
 * @throws {Error} When EXPO_PUBLIC_API_URL environment variable is not defined
 *
 * @example
 * ```typescript
 * // Basic GET request
 * const response = await fetcher('/users');
 * const users = await response.json();
 *
 * // POST request with options
 * const response = await fetcher('/users', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ name: 'John Doe' })
 * });
 *
 * // Endpoint formatting examples:
 * fetcher('users') // → baseUrl/users
 * fetcher('/users') // → baseUrl/users
 * fetcher('/api/users') // → baseUrl/users
 * fetcher('//api//users//') // → baseUrl/users
 * ```
 */
export const fetcher = (
  endpoint: string,
  options: RequestInit & {
    prefix?: string;
    query?: Record<any, string>;
  } = {},
): Promise<Response> => {
  const { prefix = 'api/v1', query = {} } = options;
  const cookie = authClient.getCookie();
  if (!endpoint || typeof endpoint !== 'string') {
    throw new TypeError('Endpoint must be a non-empty string');
  }

  if (!process.env.EXPO_PUBLIC_API_URL) {
    throw new Error('EXPO_PUBLIC_API_URL environment variable is not defined');
  }

  const formattedEndpoint = formatEndpoint(endpoint);
  const fullUrl = `${process.env.EXPO_PUBLIC_API_URL}/${prefix}${formattedEndpoint}`;

  const queryString = buildQueryString(query);
  console.info('Requesting to: ' + fullUrl);

  return fetch(fullUrl + queryString, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: cookie,
    },
  });
};

/**
 * Normalizes and formats API endpoint paths by ensuring proper structure
 * and removing redundant path segments.
 *
 * This function performs the following transformations:
 * - Ensures the path starts with a forward slash
 * - Removes redundant '/api/' segments to prevent duplication
 * - Collapses multiple consecutive slashes into single slashes
 * - Removes trailing slashes (except for root path)
 *
 * @param url - The raw endpoint URL/path to format
 * @returns The formatted endpoint path with consistent structure
 *
 * @throws {TypeError} When url is not a string
 *
 * @example
 * ```typescript
 * formatEndpoint('users') // → '/users'
 * formatEndpoint('/users') // → '/users'
 * formatEndpoint('//users//') // → '/users'
 * formatEndpoint('/api/users') // → '/users'
 * formatEndpoint('/api/api/users') // → '/users'
 * formatEndpoint('api/users/api/posts') // → '/users/api/posts'
 * formatEndpoint('') // → '/'
 * ```
 *
 * @internal This function is used internally by the fetcher and may change in future versions
 */
function formatEndpoint(url: string): string {
  if (typeof url !== 'string') {
    throw new TypeError('URL must be a string');
  }

  // Handle empty string case
  if (!url.trim()) {
    return '/';
  }

  let formattedUrl = url.trim();

  // Ensure the URL begins with "/"
  if (!formattedUrl.startsWith('/')) {
    formattedUrl = '/' + formattedUrl;
  }

  // Remove leading '/api/' segments (but preserve '/api/' in the middle of paths)
  // This regex matches '/api/' only at the beginning or after another '/'
  formattedUrl = formattedUrl.replace(/^(\/api\/)+/, '/');

  // Remove consecutive '/api/' segments that might appear after the initial cleanup
  formattedUrl = formattedUrl.replace(/\/api\/api\//g, '/api/');

  // Collapse multiple consecutive slashes into single slashes
  formattedUrl = formattedUrl.replace(/\/+/g, '/');

  // Remove trailing slash unless it's the root path
  if (formattedUrl.length > 1 && formattedUrl.endsWith('/')) {
    formattedUrl = formattedUrl.slice(0, -1);
  }

  return formattedUrl;
}
