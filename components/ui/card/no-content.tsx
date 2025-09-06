import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/reusable/card';
import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';

function NoContent({
  description = 'There are no products!',
  title = 'No Content!',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <View className="flex-1 p-4 items-center justify-center">
      <Card>
        <CardContent className="min-w-full max-w-sm">
          <Image
            source={require('../../../assets/images/content/empty-cart.png')}
            style={{ width: '100%', aspectRatio: 1 / 1 }}
            contentFit="cover"
            contentPosition="center"
          />
          <CardHeader>
            <CardTitle className="text-center text-xl">{title}</CardTitle>
            <CardDescription className="text-center">
              {description}
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </View>
  );
}

export default NoContent;
