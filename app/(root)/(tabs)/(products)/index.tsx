import { Text } from '@/components/reusable/text';
import Container from '@/components/ui/Container';
import Header from '@/components/ui/Header';
import IconButton from '@/components/ui/IconButton';
import SearchBar from '@/components/ui/SearchBar';
import { fetchProducts } from '@/core/requests/fetch-products';
import { useQuery } from '@tanstack/react-query';
import { Settings2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

function Products() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('created_at');

  const { data } = useQuery({
    queryFn: () => fetchProducts(),
    queryKey: [page, limit],
  });
  console.log(data?.products);
  return (
    <Container className="gap-2">
      <Header />
      <View className="flex-row gap-1 px-2">
        <SearchBar placeholder="Search product..." />
        <IconButton icon={Settings2} />
      </View>
      <FlatList
        data={data?.products || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>Hello</Text>
            </View>
          );
        }}

        // End reached detection
        // onEndReached={fetchMoreData}
        // onEndReachedThreshold={0.5} // Trigger when 50% from bottom

        // // Loading indicator
        // ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </Container>
  );
}

export default Products;
