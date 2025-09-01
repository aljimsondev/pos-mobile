import { cn } from '@/lib/utils';
import React from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

function Container({ className, ...rest }: SafeAreaViewProps) {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']} // exclude bottom spacing
      className={cn('flex-1', className)}
      {...rest}
    />
  );
}

export default Container;
