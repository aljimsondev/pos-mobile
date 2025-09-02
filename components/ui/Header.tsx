import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/reusable/avatar';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import {} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Menu } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';

export type HeaderTitleProps = {
  title: string | ReactNode;
};

export function HeaderTitle({
  title = <Text style={{ fontFamily: 'NicoMoji', fontSize: 24 }}>POS</Text>,
}: HeaderTitleProps) {
  const navigation = useNavigation();
  return (
    <View className="flex-row gap-2 items-center">
      <IconButton
        icon={Menu}
        onPress={() => (navigation as any).toggleDrawer()}
        className="rounded-full border-transparent"
      />
      {typeof title === 'string' ? (
        <Text className="text-lg font-semibold">{title}</Text>
      ) : (
        title
      )}
    </View>
  );
}

export function MainHeaderRight() {
  const router = useRouter();
  return (
    <View className="flex-row gap-2 items-center">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push('/profile')}
      >
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
