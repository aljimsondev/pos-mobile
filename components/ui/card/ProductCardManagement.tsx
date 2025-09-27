import { Card, CardContent } from '@/components/reusable/card';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import { useBottomSheetStore } from '@/lib/store/bottom-sheet.store';
import { useDialogStore } from '@/lib/store/dialog-store';
import { Product } from '@/lib/types/product';
import { getImageUrl } from '@/lib/utils';
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Toast } from 'toastify-react-native';
type ProductCardManagementProps = {
  product: Product & {
    photo: {
      file_name: string;
      id: number;
      mimetype: string;
      thumbnail_url: string | null;
      url: string;
    };
  };
  style?: StyleProp<ViewStyle>;
};

function ProductCardManagement({ style, product }: ProductCardManagementProps) {
  const photoUrl = getImageUrl(product.photo.url);
  const { showDialog } = useDialogStore();
  const { open } = useBottomSheetStore();

  const handleDelete = () => {
    try {
      showDialog({
        title: `Delete ${product.name}?`,
        description: `This cannot be undone!`,
        variant: 'destructive',
        continueText: 'Yes , delete it!',
        onContinue: async () => {
          // todo manage product deletion
        },
      });
    } catch (e: any) {
      console.warn(e);
      Toast.error(e?.message);
    }
  };

  const onOpenAddVariation = () => {
    open('createProductVariation');
  };

  return (
    <Card className="p-0 h-fit overflow-hidden" style={style}>
      <CardContent className="p-0 flex-row">
        <Image
          source={photoUrl}
          style={{ width: 100, aspectRatio: 3 / 4 }}
          contentFit="cover"
          contentPosition="center"
        />
        <View className="px-2 line-clamp-2 py-4 flex-1">
          <Text>{product.name}</Text>
          <Text className="text-muted-foreground line-clamp-2">
            {product.description}
          </Text>
          <View className="flex-row gap-2 mt-2 items-center justify-end">
            <IconButton
              icon={(color) => <Feather name="plus" color={color} size={18} />}
            />
            <IconButton
              icon={(color) => (
                <MaterialCommunityIcons name="pencil" color={color} size={18} />
              )}
            />
            <IconButton
              iconTheme="destructive"
              className="active:bg-destructive/10"
              icon={(color) => (
                <FontAwesome name="trash-o" color={color} size={18} />
              )}
              onPress={handleDelete}
            />
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

export default ProductCardManagement;
