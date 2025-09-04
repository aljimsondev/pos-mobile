import { Button } from '@/components/reusable/button';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import NoContent from '@/components/ui/card/no-content';
import Container from '@/components/ui/Container';
import CartList from '@/components/ui/list/cart.list';
import { useCartSelectors, useCartStore } from '@/lib/store/cart-store';
import { cn } from '@/lib/utils';
import { formatPHP } from '@/lib/utils/currency-formatter';
import React from 'react';
import { View } from 'react-native';

function Cart() {
  const { items } = useCartStore();
  const { totalPrice, vat, subTotal, isEmpty } = useCartSelectors({
    VAT_RATE: 0.02,
  });

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
      <View className="gap-2 px-2 pb-2 bg-card">
        <Separator />
        <Text>Order Summary</Text>
        <Separator />
        <SummaryItem
          label="Subtotal"
          labelClassName="text-sm"
          value={formatPHP(subTotal)}
        />
        <SummaryItem
          label="VAT"
          labelClassName="text-sm"
          value={formatPHP(vat)}
        />
        <SummaryItem
          label="Total"
          labelClassName="text-primary text-lg"
          value={formatPHP(totalPrice)}
          valueClassName="text-xl text-primary font-bold"
        />
        <Button>
          <Text>Checkout</Text>
        </Button>
      </View>
    </Container>
  );
}

export default Cart;

function SummaryItem({
  label = '',
  value = '',
  labelClassName = '',
  valueClassName = '',
}: {
  label?: string;
  value?: string;
  valueClassName?: string;
  labelClassName?: string;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className={cn('text-muted-foreground', labelClassName)}>
        {label}
      </Text>

      <Text className={cn('text-muted-foreground', valueClassName)}>
        {value}
      </Text>
    </View>
  );
}
