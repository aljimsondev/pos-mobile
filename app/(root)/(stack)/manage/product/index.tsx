import NoContent from '@/components/ui/card/no-content';
import ProductFilter from '@/components/ui/card/product-filter.card';
import ProductListManagement from '@/components/ui/list/ProductListManagement';
import SearchBar from '@/components/ui/SearchBar';
import { fetchProducts } from '@/core/requests/fetch-products';
import { Product } from '@/lib/types/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import debounce from 'debounce';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

export default function ManageProduct() {
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [targetProduct, setTargetProduct] = useState<Product | null>(null);
  const [openAddVariantSheet, setOpenAddVariantSheet] = useState(false);

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

  // handler for editing adding product variant
  const onSelectProductForVariantAddition = (product: Product) => {
    setTargetProduct(product);
    setOpenAddVariantSheet(true);
  };

  const products = data?.pages?.map((page) => page.products).flat() || [];
  const emptyProducts = products.length <= 0;

  return (
    <View className="flex-1">
      <View className="flex-row gap-1 px-2">
        <SearchBar
          value={search}
          onChangeText={handleSearchChange}
          placeholder="Search product..."
          showClearButton={search !== ''}
          onTextClear={handleClearSearchText}
        />
      </View>
      <ProductFilter />
      {emptyProducts ? (
        <NoContent
          title="No products found!"
          description={
            debouncedSearch
              ? "There's no product matching this keyword!"
              : 'There are no products yet!'
          }
        />
      ) : (
        <ProductListManagement
          data={products}
          loadMore={fetchNextPage}
          isFetchingData={isFetchingNextPage}
          isLoading={isFetching}
          className="px-2"
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
