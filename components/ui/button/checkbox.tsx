import { Text } from '@/components/reusable/text';
import { cn } from '@/lib/utils';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';

interface AppCheckboxProps extends PressableProps {
  label?: string;
  onPress: () => void; // override type
  selected?: boolean;
}

function AppCheckbox({
  className,
  label,
  selected = false,
  onPress,
  ...rest
}: AppCheckboxProps) {
  const onPressCheckbox = () => {
    onPress();
  };
  return (
    <Pressable
      className={cn(
        'p-2 items-center active:bg-muted rounded-md flex-1 justify-start flex-row gap-2 z-10',
        className,
      )}
      onPress={onPress}
      {...rest}
    >
      <Checkbox
        id="category_checkbox"
        className="z-0"
        onValueChange={onPressCheckbox}
        value={selected}
      />
      <Text>{label}</Text>
    </Pressable>
  );
}

export default AppCheckbox;
