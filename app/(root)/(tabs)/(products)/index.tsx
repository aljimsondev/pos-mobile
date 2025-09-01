import { Text } from '@/components/reusable/text';
import Container from '@/components/ui/Container';
import Header from '@/components/ui/Header';
import IconButton from '@/components/ui/IconButton';
import SearchBar from '@/components/ui/SearchBar';
import { fetchProducts } from '@/core/requests/fetch-products';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
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
      <Text>Products page</Text>
      <Link href="/(root)/(tabs)/(products)/search">
        <Text className="underline">Search Product</Text>
      </Link>
      <Link href="/(root)/(tabs)/(products)/1">
        <Text className="underline">View Product</Text>
      </Link>
    </Container>
  );
}

export default Products;
