import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/lib/types/product';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
} from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

// Calculate number of columns based on screen width
const getNumColumns = () => {
  if (screenWidth > 768) return 4; // Tablet landscape
  if (screenWidth > 480) return 3; // Tablet portrait
  return 2; // Phone
};

function ProductList({
  data,
  loadMore,
  isFetchingData,
  onRefresh,
  isLoading = false,
  ...rest
}: Partial<FlatListProps<Product>> & {
  loadMore: () => void;
  isFetchingData: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
}) {
  const numColumns = getNumColumns();
  const itemMargin = 4;
  const containerPadding = 16;

  const itemWidth = (screenWidth - containerPadding) / numColumns - itemMargin;

  return (
    <FlatList
      {...rest}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <ProductCard
            product={item}
            style={{
              width: itemWidth,
              margin: itemMargin,
            }}
          />
        );
      }}
      // Pull-to-refresh functionality
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={['#007AFF']} // Android
            tintColor="#007AFF" // iOS
          />
        ) : undefined
      }
      numColumns={numColumns}
      className="px-2"
      contentContainerClassName="justify-center items-start"
      // Pagination
      onEndReached={loadMore}
      onEndReachedThreshold={0.2} // Trigger when 80% from bottom
      // Maintain scroll position on data changes
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 1,
      }}
      // Loading indicator
      ListFooterComponent={
        isFetchingData ? (
          <View className="p-2 bg-card rounded-full absolute border-muted border-[1px] bottom-0 shadow-md">
            <ActivityIndicator size={34} />
          </View>
        ) : null
      }
      ListFooterComponentStyle={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}

export default ProductList;
