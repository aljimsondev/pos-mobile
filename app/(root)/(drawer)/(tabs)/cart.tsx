import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import Container from '@/components/ui/Container';
import CartList from '@/components/ui/list/cart.list';
import { useCartStore } from '@/lib/store/cart-store';
import React from 'react';
import { View } from 'react-native';

function Cart() {
  const { items } = useCartStore();
  return (
    <Container edges={[]}>
      <View className="flex-1">
        <CartList data={items} />
      </View>
      <View className="p-2">
        <Button>
          <Text>Checkout</Text>
        </Button>
      </View>
    </Container>
  );
}

export default Cart;
