import NoContent from '@/components/ui/card/no-content';
import BrandList from '@/components/ui/list/BrandList';
import SearchBar from '@/components/ui/SearchBar';
import { fetchBrands } from '@/core/requests/fetch-brands';
import { useInfiniteQuery } from '@tanstack/react-query';
import debounce from 'debounce';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

export default function ManageBrand() {
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data, isFetching, fetchNextPage, refetch, isFetchingNextPage } =
    useInfiniteQuery({
      queryFn: ({ pageParam: nextPage }) =>
        fetchBrands({
          page: nextPage,
          limit: limit,
          search: debouncedSearch,
          sort_by: orderBy,
          sort_order: sortOrder,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage.pagination.has_next_page) return undefined;

        return lastPage.pagination.page + 1;
      },
      queryKey: [limit, debouncedSearch, sortOrder, orderBy],
      refetchOnWindowFocus: true,
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

  const brands = data?.pages.map((page) => page.results).flat() || [];
  const emptyBrands = brands.length <= 0;

  return (
    <View className="p-2 flex-1">
      <SearchBar
        placeholder="Search brand..."
        value={search}
        showClearButton={search !== ''}
        onTextClear={handleClearSearchText}
        onChangeText={handleSearchChange}
      />
      {emptyBrands ? (
        <NoContent
          title="Empy brand!"
          description={
            debouncedSearch
              ? "There's no brand matching this keyword!"
              : 'There are no brands yet!'
          }
        />
      ) : (
        <BrandList
          data={brands}
          keyExtractor={(item) => item.id}
          loadMore={fetchNextPage}
          isFetchingData={isFetchingNextPage}
          isLoading={isFetching}
          onRefresh={refetch}
          // Performance optimizations
          removeClippedSubviews={true}
          initialNumToRender={limit}
          maxToRenderPerBatch={Math.floor(limit / 2)}
          updateCellsBatchingPeriod={100}
          windowSize={limit}
        />
      )}
    </View>
  );
}
