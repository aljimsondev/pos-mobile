import Container from '@/components/ui/Container';
import ProductVariationList from '@/components/ui/list/ProductVariationList';
import { fetchProductVariations } from '@/core/requests/fetch-product-variation';
import { useInfiniteQuery } from '@tanstack/react-query';
import debounce from 'debounce';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

function ProductVariations() {
  const { productId, productName } = useLocalSearchParams<{
    productId: string;
    productName: string;
  }>();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { data, isFetching, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryFn: ({ pageParam: nextPage }) =>
        fetchProductVariations({
          productId,
          params: {
            limit,
            page: nextPage,
            search: debouncedSearch,
          },
        }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.pagination.has_next_page) return;

        return lastPage.pagination.page + 1;
      },
      queryKey: [],
    });

  // Debounced function to update the delayed state
  const updateDebouncedSearch = useCallback(
    debounce((searchTerm) => {
      setDebouncedSearch(searchTerm);
    }, 500), // 300ms delay
    [],
  );

  const handleSearchChange = (text: string) => {
    setSearch(text); // Immediate update for input
    updateDebouncedSearch(text); // Delayed update for API trigger
  };

  const handleClearSearchText = () => {
    setSearch(''); // Immediate update for input
    updateDebouncedSearch(''); // Delayed update for API trigger
  };

  const variations = data?.pages.map((data) => data.results).flat();

  return (
    <Container edges={[]}>
      <View className="flex-1 px-2">
        <ProductVariationList
          data={variations || []}
          isFetchingData={isFetching}
          loadMore={fetchNextPage}
        />
      </View>
    </Container>
  );
}

export default ProductVariations;
