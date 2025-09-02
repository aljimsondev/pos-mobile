import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/reusable/avatar';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import {} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Menu } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export function HeaderTitle() {
  const navigation = useNavigation();
  return (
    <View className="flex-row gap-2 items-center">
      <IconButton
        icon={Menu}
        onPress={() => (navigation as any).toggleDrawer()}
        className="rounded-full border-transparent"
      />
      <Text style={{ fontFamily: 'NicoMoji', fontSize: 24 }}>POS</Text>
    </View>
  );
}

export function MainHeaderRight() {
  return (
    <View className="flex-row gap-2 items-center">
      <TouchableOpacity activeOpacity={0.7}>
        <Avatar alt="Zach Nugent's Avatar" className="h-10 w-10">
          <AvatarImage
            source={{ uri: 'https://github.com/mrzachnugent.png' }}
          />
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
      </TouchableOpacity>
    </View>
  );
}
