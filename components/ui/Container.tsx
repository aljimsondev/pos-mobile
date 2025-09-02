import { cn } from '@/lib/utils';
import React from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

function Container({
  className,
  edges = ['left', 'right', 'top'], // exclude bottom spacing by default
  ...rest
}: SafeAreaViewProps) {
  return (
    <SafeAreaView edges={edges} className={cn('flex-1', className)} {...rest} />
  );
}

export default Container;
