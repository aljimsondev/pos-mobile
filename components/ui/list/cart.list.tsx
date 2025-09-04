import CartItem from '@/components/ui/card/cart-item.card';
import { CartProduct } from '@/lib/store/cart-store';
import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

const GAP = 8;

function CartList({
  data = [],
  ...props
}: Partial<FlatListProps<CartProduct>>) {
  return (
    <FlatList
      data={data}
      renderItem={(item) => <CartItem {...item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: GAP }}
      // Maintain scroll position on data changes
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 1,
      }}
      {...props}
    />
  );
}

export default CartList;
