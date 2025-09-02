import { Button } from '@/components/reusable/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/reusable/card';
import { Text } from '@/components/reusable/text';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { KeyRound } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

function AppScanner() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="flex-row">
            <View className="flex-1 gap-1.5 ">
              <View className="py-4 items-center justify-center">
                <View className="border-muted border-[1px] p-4 rounded-md ">
                  <KeyRound />
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
      <CameraView style={{ flex: 1 }} facing="back" />
    </View>
  );
}

export default AppScanner;
