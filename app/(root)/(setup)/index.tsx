import { Button } from '@/components/reusable/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/reusable/card';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Text } from '@/components/reusable/text';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function Index() {
  const onCompleteSetup = () => {
    try {
      //todo update account password
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="items-center justify-center mt-safe justify-center items-center h-full bg-card"
      keyboardDismissMode="interactive"
    >
      <View className="gap-6 w-full">
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">
              Setting up your account!
            </CardTitle>
            <CardDescription className="text-center sm:text-left">
              Complete your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            <View className="gap-6">
              <View className="gap-1.5">
                <Label htmlFor="email">Password</Label>
                <Input id="password" secureTextEntry />
              </View>
              <View className="gap-1.5">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={onCompleteSetup}
                />
              </View>
              <Button className="w-full" onPress={onCompleteSetup}>
                <Text>Continue</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
