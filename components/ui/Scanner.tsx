import { Button } from '@/components/reusable/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/reusable/card';
import { Text } from '@/components/reusable/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

function AppScanner() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  if (!device) return null;

  if (!hasPermission) {
    return (
      <View className="flex-1 items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="flex-row">
            <View className="flex-1 gap-1.5 ">
              <View className="py-4 items-center justify-center">
                <View className="border-muted border-[1px] p-4 rounded-md ">
                  <Ionicons name="key" size={24} />
                </View>
              </View>
              <CardTitle>Camera Permission</CardTitle>
              <CardDescription>
                We need your permission to show the camera
              </CardDescription>
            </View>
          </CardHeader>
          <CardContent>
            <Button onPress={requestPermission}>
              <Text>Grant Permission</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-red-500 justify-center">
      <Camera style={{ flex: 1 }} device={device} isActive={true} />
    </View>
  );
}

export default AppScanner;
