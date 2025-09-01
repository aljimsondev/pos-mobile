import Container from '@/components/ui/Container';
import Header from '@/components/ui/Header';
import IconButton from '@/components/ui/IconButton';
import ProductList from '@/components/ui/list/ProductList';
import SearchBar from '@/components/ui/SearchBar';
import { fetchProducts } from '@/core/requests/fetch-products';
import { useQuery } from '@tanstack/react-query';
import { Settings2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';

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
