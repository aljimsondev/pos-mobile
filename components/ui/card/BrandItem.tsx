import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import useThemeVariables from '@/hooks/useThemeVariables';
import { useDialogStore } from '@/lib/store/dialog-store';
import { fetcher } from '@/lib/utils';
import { Brand } from '@aljimsondev/database-schema';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Toast } from 'toastify-react-native';

interface BrandItemProps {
  brand: Brand;
}

export default function BrandItem({ brand }: BrandItemProps) {
  const colors = useThemeVariables();
  const { showDialog } = useDialogStore();

  const onDeleteBrand = () => {
    try {
      if (!brand.id) throw new Error('Brand id is required!');

      showDialog({
        title: 'Confirmation!',
        description: 'Are you sure you want to remove this brand!',
        showContinue: true,
        showCancel: true,
        continueText: 'Yes, delete it!',
        variant: 'destructive',
        onContinue: async () => {
          const response = await fetcher(`brand/dummy`, {
            method: 'DELETE',
          });

          const body = await response.json();

          if (!body.success) throw body?.error?.message;

          Toast.success('Brand deleted successfully!', 'bottom');
        },
      });
    } catch (e: any) {
      console.warn(e); // add logs for debugging purposes
      Toast.error(e?.message, 'bottom');
    }
  };

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
        onPress={onDeleteBrand}
      />
    </View>
  );
}
