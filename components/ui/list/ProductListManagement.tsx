import ProductCardManagement from '@/components/ui/card/ProductCardManagement';
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
export const getNumColumns = () => {
  if (screenWidth > 768) return 4; // Tablet landscape
  if (screenWidth > 480) return 3; // Tablet portrait
  return 2; // Phone
};

export default function ProductListManagement({
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
  const GAP = 8;

  return (
    <View className="flex-1 py-2">
      <FlatList
        {...rest}
        data={data as Product[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCardManagement product={item} />}
        // styling
        contentContainerStyle={{ gap: GAP }}
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
    </View>
  );
}
