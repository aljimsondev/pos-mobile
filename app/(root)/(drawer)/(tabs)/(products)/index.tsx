import Container from '@/components/ui/Container';
import IconButton from '@/components/ui/IconButton';
import ProductList from '@/components/ui/list/ProductList';
import SearchBar from '@/components/ui/SearchBar';
import { fetchProducts } from '@/core/requests/fetch-products';
import { useDialogStore } from '@/lib/store/dialog-store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View } from 'react-native';

function Products() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const { showDialog } = useDialogStore();

  const { data } = useQuery({
    queryFn: () => fetchProducts(),
    queryKey: [page, limit],
  });
  console.log(data?.products);
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
        products={new Array(10).fill(0).map((_, index) => {
          return {
            id: `${index}`,
          };
        })}
      />
    </Container>
  );
}

export default Products;
