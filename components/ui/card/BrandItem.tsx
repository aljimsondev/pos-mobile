import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import useThemeVariables from '@/hooks/useThemeVariables';
import { Brand } from '@aljimsondev/database-schema';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface BrandItemProps {
  brand: Brand;
}

export default function BrandItem({ brand }: BrandItemProps) {
  const colors = useThemeVariables();
  return (
    <View className="p-2 flex items-center flex-row gap-2">
      <View className="flex-1">
        <Text>{brand.name}</Text>
      </View>
      <IconButton
        className="border-transparent rounded-full"
        icon={(color) => (
          <MaterialCommunityIcons name="pencil" color={color} size={18} />
        )}
      />
      <IconButton
        className="border-transparent rounded-full"
        icon={(color) => (
          <FontAwesome name="trash-o" color={colors.destructive} size={18} />
        )}
      />
    </View>
  );
}
