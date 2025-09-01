import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/reusable/avatar';
import { Text } from '@/components/reusable/text';
import {} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
function Header() {
  const navigation = useNavigation();
  return (
    <View className="w-full border-b-border flex-row items-center justify-between border-b-[1px] p-2">
      <View>
        <Image
          source={require('../../assets/images/icon.png')}
          style={{ width: 30, height: 30 }}
          contentFit="contain"
        />
      </View>
      <TouchableOpacity onPress={() => (navigation as any).toggleDrawer()}>
        <Avatar alt="Zach Nugent's Avatar">
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

export default Header;
