import { Input } from '@/components/reusable/input';
import { cn } from '@/lib/utils';
import React from 'react';
import { TextInputProps, View } from 'react-native';

function SearchBar({ className, ...rest }: TextInputProps) {
  return (
    <View className="flex-1">
      <Input className={cn('', className)} {...rest} />
    </View>
  );
}

export default SearchBar;
