import { Button } from '@/components/reusable/button';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import { useCartSelectors } from '@/lib/store/cart-store';
import { cn } from '@/lib/utils';
import { formatPHP } from '@/lib/utils/currency-formatter';
import React from 'react';
import { View } from 'react-native';

function CartSummary() {
  const { totalPrice, vat, subTotal } = useCartSelectors();
  console.log(formatPHP(vat));
  return (
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
  );
}

export default CartSummary;

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
