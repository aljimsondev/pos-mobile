import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/lib/types/product';
import React from 'react';
import { Dimensions, FlatList } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

function ProductList({ products = [] }: { products: Product[] }) {
  // Calculate number of columns based on screen width
  const getNumColumns = () => {
    if (screenWidth > 768) return 4; // Tablet landscape
    if (screenWidth > 480) return 3; // Tablet portrait
    return 2; // Phone
  };

  const numColumns = getNumColumns();
  const itemMargin = 4;
  const containerPadding = 16;

  const itemWidth = (screenWidth - containerPadding) / numColumns - itemMargin;

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <ProductCard
            product={item}
            style={{
              height: 200,
              width: itemWidth,
              margin: itemMargin,
            }}
          />
        );
      }}
      numColumns={numColumns}
      className="px-2 bg-gray-400"
      contentContainerClassName="justify-center items-center"
      // End reached detection
      // onEndReached={fetchMoreData}
      // onEndReachedThreshold={0.5} // Trigger when 50% from bottom

      // // Loading indicator
      // ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
}

export default ProductList;
