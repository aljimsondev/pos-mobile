import { Input } from '@/components/reusable/input';
import { THEME } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInputProps, TouchableOpacity, View } from 'react-native';

function SearchBar({
  className,
  showClearButton,
  onTextClear,
  ...rest
}: TextInputProps & {
  showClearButton?: boolean;
  onTextClear?: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center">
      <Input
        className={cn('', className)}
        style={{ paddingRight: 36 }}
        {...rest}
      />
      {showClearButton && (
        <TouchableOpacity
          className="absolute p-2 right-0"
          activeOpacity={0.8}
          onPress={onTextClear}
        >
          <Ionicons
            name="close"
            size={24}
            color={THEME.light.mutedForeground}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default SearchBar;
