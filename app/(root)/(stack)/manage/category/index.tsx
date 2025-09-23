import NoContent from '@/components/ui/card/no-content';
import CategoriesList from '@/components/ui/list/CategoriesList';
import SearchBar from '@/components/ui/SearchBar';
import { fetchCategories } from '@/core/requests/fetch-categories';
import { useQuery } from '@tanstack/react-query';
import debounce from 'debounce';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function ManageCategory() {
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data, isFetching, refetch } = useQuery({
    queryFn: () => fetchCategories(),
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

  const noCategory = (data || []).length <= 0;

  return (
    <View className="p-2 flex-1">
      <SearchBar
        placeholder="Search category..."
        value={search}
        showClearButton={search !== ''}
        onTextClear={handleClearSearchText}
        onChangeText={handleSearchChange}
      />
      {isFetching ? (
        <ActivityIndicator />
      ) : noCategory ? (
        <NoContent
          title="Empy Categories!"
          description={
            debouncedSearch
              ? "There's no category matching this keyword!"
              : 'There are no category yet!'
          }
        />
      ) : (
        <CategoriesList
          data={data || []}
          keyExtractor={(item) => item.id}
          isFetchingData={isFetching}
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
