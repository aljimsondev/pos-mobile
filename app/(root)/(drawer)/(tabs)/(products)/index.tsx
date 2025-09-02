import Container from '@/components/ui/Container';
import IconButton from '@/components/ui/IconButton';
import ProductList from '@/components/ui/list/ProductList';
import SearchBar from '@/components/ui/SearchBar';
import { fetchProducts } from '@/core/requests/fetch-products';
import { useDialogStore } from '@/lib/store/dialog-store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';

function Products() {
  const [limit, setLimit] = useState(6);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const { showDialog } = useDialogStore();

  const { data, fetchNextPage, refetch, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryFn: ({ pageParam: nextPage }) =>
        fetchProducts({
          limit: limit,
          page: nextPage,
          sort_order: sortOrder,
          sort_by: orderBy,
        }),
      queryKey: [limit],
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
        <SearchBar placeholder="Search product..." />
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
        windowSize={10}
      />
    </Container>
  );
}

export default Products;
