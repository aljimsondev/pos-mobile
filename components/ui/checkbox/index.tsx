import { Text } from '@/components/reusable/text';
import Checkbox, { CheckboxProps } from 'expo-checkbox';
import React from 'react';
import { Pressable } from 'react-native';

export interface AppCheckboxProps extends CheckboxProps {
  checked?: boolean;
  label: string;
  onCheckChange: () => void;
}

export default function AppCheckbox({
  checked,
  onCheckChange,
  label,
  ...rest
}: AppCheckboxProps) {
  return (
    <Pressable
      className="flex-row gap-2 items-center py-2 px-1 rounded-md"
      onPress={onCheckChange}
    >
      <Checkbox value={checked} {...rest} onValueChange={onCheckChange} />
      <Text>{label}</Text>
    </Pressable>
  );
}
