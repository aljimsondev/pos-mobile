import Container from '@/components/ui/Container';
import IconButton from '@/components/ui/IconButton';
import ProductList from '@/components/ui/list/ProductList';
import SearchBar from '@/components/ui/SearchBar';
import { fetchProducts } from '@/core/requests/fetch-products';
import { useDialogStore } from '@/lib/store/dialog-store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useInfiniteQuery } from '@tanstack/react-query';
import debounce from 'debounce';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

function Products() {
  const [limit, setLimit] = useState(6);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const { showDialog } = useDialogStore();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

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

  const { data, fetchNextPage, refetch, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryFn: ({ pageParam: nextPage }) =>
        fetchProducts({
          limit: limit,
          page: nextPage,
          sort_order: sortOrder,
          sort_by: orderBy,
          search: debouncedSearch,
        }),
      queryKey: [limit, debouncedSearch],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage.pagination.has_next_page) return undefined;

        return lastPage.pagination.page + 1;
      },
    });

  const products = data?.pages?.map((page) => page.products).flat();

  return (
    <Container className="gap-2 pt-2" edges={['left', 'right']}>
      <View className="flex-row gap-1 px-2">
        <SearchBar
          value={search}
          onChangeText={handleSearchChange}
          placeholder="Search product..."
          showClearButton={search !== ''}
          onTextClear={handleClearSearchText}
        />
        <IconButton
          icon={<Ionicons name="filter" size={24} />}
          onPress={() => {
            showDialog({
              title: 'Hello',
              description: 'Dialog test',
            });
          }}
        />
      </View>
      <ProductList
        data={products || []}
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
    </Container>
  );
}

export default Products;
