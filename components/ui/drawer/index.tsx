import { Card, CardContent } from '@/components/reusable/card';
import { Text } from '@/components/reusable/text';
import { THEME } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { Pressable, useColorScheme, View } from 'react-native';

interface DrawerBlockProps {
  children: ReactNode;
  blockTitle: string;
}

export function DrawerBlock({ children, blockTitle }: DrawerBlockProps) {
  return (
    <View className="gap-2 my-2">
      <Text className="text-muted-foreground">{blockTitle}</Text>
      <Card className="p-2">
        <CardContent className="gap-1 p-0">{children}</CardContent>
      </Card>
    </View>
  );
}

interface DrawerActionProps {
  label: string;
  icon?: (color: string, size: number) => ReactNode | null;
}

export function DrawerBlockAction({ label, icon }: DrawerActionProps) {
  const theme = useColorScheme() as 'dark' | 'light';
  const iconColor = THEME[theme].mutedForeground;
  const iconSize = 18;
  return (
    <Pressable className="flex-row p-2 active:bg-muted rounded-md items-center">
      <View className="flex-row gap-2 items-center flex-1">
        {icon && icon(iconColor, iconSize)}
        <Text>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={iconSize} color={iconColor} />
    </Pressable>
  );
}
