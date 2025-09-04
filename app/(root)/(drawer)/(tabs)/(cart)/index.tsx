import NoContent from '@/components/ui/card/no-content';
import Container from '@/components/ui/Container';
import CartList from '@/components/ui/list/cart.list';
import { useCartSelectors, useCartStore } from '@/lib/store/cart-store';
import React from 'react';
import { View } from 'react-native';
import CartSummary from './_component/summary';

function Cart() {
  const { items } = useCartStore();
  const { isEmpty } = useCartSelectors();

  if (isEmpty)
    return (
      <NoContent
        title="Cart is empty!"
        description="There are no items in the cart at the moment!"
      />
    );

  return (
    <Container edges={[]}>
      <View className="flex-1">
        <CartList data={items} />
      </View>
      <CartSummary />
    </Container>
  );
}

export default Cart;
