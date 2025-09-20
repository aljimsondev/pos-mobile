import { Separator } from '@/components/reusable/separator';
import BrandItem from '@/components/ui/card/BrandItem';
import { Brand } from '@aljimsondev/database-schema';
import React, { Fragment } from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
} from 'react-native';

function BrandList({
  data = [],
  isLoading = true,
  onRefresh,
  isFetchingData,
  loadMore,
  ...rest
}: Partial<FlatListProps<Brand>> & {
  loadMore: () => void;
  isFetchingData: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
}) {
  return (
    <View className="flex-1">
      <FlatList
        {...rest}
        data={data as Brand[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <Fragment>
              <BrandItem brand={item} onRefresh={onRefresh} />
              {index !== data!.length - 1 && <Separator />}
            </Fragment>
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

export default BrandList;
