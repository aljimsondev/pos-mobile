import { Button } from '@/components/reusable/button';
import { Text } from '@/components/reusable/text';
import Container from '@/components/ui/Container';
import { DrawerBlock, DrawerBlockAction } from '@/components/ui/drawer';
import { authClient } from '@/lib/auth/client';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View } from 'react-native';

function AppDrawer({
  descriptors,
  navigation,
  state,
}: DrawerContentComponentProps) {
  return (
    <Container className="py-safe px-4">
      <View className="py-3 border-b-border border-b-[1px]">
        <Text style={{ fontFamily: 'NicoMoji', fontSize: 24 }}>MENU</Text>
      </View>
      <ScrollView className="flex-1 my-4">
        <DrawerBlock blockTitle="Product">
          <DrawerBlockAction
            label="Manage products"
            icon={(color, size) => (
              <FontAwesome5 size={size} name="cart-plus" color={color} />
            )}
          />
          <DrawerBlockAction
            label="Manage product brand"
            icon={(color, size) => (
              <MaterialIcons
                size={size}
                color={color}
                name="branding-watermark"
              />
            )}
          />
          <DrawerBlockAction
            label="Manage categories"
            icon={(color, size) => (
              <MaterialIcons size={size} color={color} name="category" />
            )}
          />
        </DrawerBlock>
        <DrawerBlock blockTitle="Product">
          <DrawerBlockAction
            label="Manage products"
            icon={(color, size) => (
              <FontAwesome5 size={size} name="cart-plus" color={color} />
            )}
          />
          <DrawerBlockAction
            label="Manage product brand"
            icon={(color, size) => (
              <MaterialIcons
                size={size}
                color={color}
                name="branding-watermark"
              />
            )}
          />
          <DrawerBlockAction
            label="Manage categories"
            icon={(color, size) => (
              <MaterialIcons size={size} color={color} name="category" />
            )}
          />
        </DrawerBlock>
        <DrawerBlock blockTitle="Product">
          <DrawerBlockAction
            label="Manage products"
            icon={(color, size) => (
              <FontAwesome5 size={size} name="cart-plus" color={color} />
            )}
          />
          <DrawerBlockAction
            label="Manage product brand"
            icon={(color, size) => (
              <MaterialIcons
                size={size}
                color={color}
                name="branding-watermark"
              />
            )}
          />
          <DrawerBlockAction
            label="Manage categories"
            icon={(color, size) => (
              <MaterialIcons size={size} color={color} name="category" />
            )}
          />
        </DrawerBlock>
        <DrawerBlock blockTitle="Product">
          <DrawerBlockAction
            label="Manage products"
            icon={(color, size) => (
              <FontAwesome5 size={size} name="cart-plus" color={color} />
            )}
          />
          <DrawerBlockAction
            label="Manage product brand"
            icon={(color, size) => (
              <MaterialIcons
                size={size}
                color={color}
                name="branding-watermark"
              />
            )}
          />
          <DrawerBlockAction
            label="Manage categories"
            icon={(color, size) => (
              <MaterialIcons size={size} color={color} name="category" />
            )}
          />
        </DrawerBlock>
        <DrawerBlock blockTitle="Product">
          <DrawerBlockAction
            label="Manage products"
            icon={(color, size) => (
              <FontAwesome5 size={size} name="cart-plus" color={color} />
            )}
          />
          <DrawerBlockAction
            label="Manage product brand"
            icon={(color, size) => (
              <MaterialIcons
                size={size}
                color={color}
                name="branding-watermark"
              />
            )}
          />
          <DrawerBlockAction
            label="Manage categories"
            icon={(color, size) => (
              <MaterialIcons size={size} color={color} name="category" />
            )}
          />
        </DrawerBlock>
        <DrawerBlock blockTitle="Product">
          <DrawerBlockAction
            label="Manage products"
            icon={(color, size) => (
              <FontAwesome5 size={size} name="cart-plus" color={color} />
            )}
          />
          <DrawerBlockAction
            label="Manage product brand"
            icon={(color, size) => (
              <MaterialIcons
                size={size}
                color={color}
                name="branding-watermark"
              />
            )}
          />
          <DrawerBlockAction
            label="Manage categories"
            icon={(color, size) => (
              <MaterialIcons size={size} color={color} name="category" />
            )}
          />
        </DrawerBlock>
      </ScrollView>
      <Button onPress={() => authClient.signOut()}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
}

export default AppDrawer;
