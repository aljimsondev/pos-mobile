import { Separator } from '@/components/reusable/separator';
import { CategoryItem } from '@/components/ui/card/CategoryItem';
import { Category } from '@aljimsondev/database-schema';
import React, { Fragment } from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
} from 'react-native';

export default function CategoriesList({
  data = [],
  isLoading = true,
  onRefresh,
  isFetchingData,
  ...rest
}: Partial<FlatListProps<Category>> & {
  isFetchingData: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
}) {
  return (
    <View className="flex-1">
      <FlatList
        {...rest}
        data={data as Category[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <Fragment>
              <CategoryItem {...item} />
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
