import { Text } from '@/components/reusable/text';
import Container from '@/components/ui/Container';
import { Link } from 'expo-router';
import React from 'react';

function Products() {
  return (
    <Container>
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
