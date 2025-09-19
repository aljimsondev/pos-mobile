import { Separator } from '@/components/reusable/separator';
import BrandItem from '@/components/ui/card/BrandItem';
import SearchBar from '@/components/ui/SearchBar';
import { fetchBrands } from '@/core/requests/fetch-brands';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useState } from 'react';
import { FlatList, View } from 'react-native';

export default function ManageBrand() {
  const [limit, setLimit] = useState(10);
  const { data, isFetching } = useInfiniteQuery({
    queryFn: ({ pageParam: nextPage }) =>
      fetchBrands({
        page: nextPage,
        limit: limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.has_next_page) return undefined;

      return lastPage.pagination.page + 1;
    },
    queryKey: [],
  });

  const brands = data?.pages.map((page) => page.results).flat() || [];

  return (
    <View className="p-2 flex-1">
      <SearchBar />
      <FlatList
        contentContainerClassName="flex-1"
        data={brands}
        renderItem={({ item, index }) => {
          return (
            <Fragment>
              <BrandItem brand={item} />
              {index !== brands.length - 1 && <Separator />}
            </Fragment>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
