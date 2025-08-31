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
import { authClient } from '@/lib/auth/client';
import { setupAccountSchema } from '@/lib/schema/setup-account.schema';
import { useDialogStore } from '@/lib/store/dialog-store';
import { fetcher } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function Index() {
  const { data } = authClient.useSession();
  const { showDialog } = useDialogStore();
  const form = useForm({
    resolver: zodResolver(setupAccountSchema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = form.handleSubmit(async ({ password, confirmPassword }) => {
    try {
      const res = await fetcher(`user/update-password/${data?.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ password: password }),
      });

      const resBody = await res.json();
      if (!resBody?.success) throw new Error(resBody?.error?.message);

      showDialog({
        title: 'Setup success!',
        description:
          'Account successfully set, please login to start using the app!',
        showCancel: false,
        showContinue: true,
        onContinue: () => {
          authClient.signOut(); // reauthenticate user with new credential
        },
      });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Account setup failed!',
        text2: e?.message,
        position: 'bottom',
        useModal: true,
        progressBarColor: 'transparent',
      });
    }
  });

  const enabledSubmitting =
    Object.keys(form.formState.errors).length === 0 &&
    form.formState.isValid &&
    form.watch('password') &&
    form.watch('confirmPassword');

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
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      id="password"
                      secureTextEntry
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  )}
                />
                <Text className="text-destructive text-sm">
                  {form.formState.errors.password &&
                    form.formState.errors.password.message}
                </Text>
              </View>
              <View className="gap-1.5">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Controller
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <Input
                      id="confirm-password"
                      secureTextEntry
                      returnKeyType="send"
                      onSubmitEditing={onSubmit}
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  )}
                />
                <Text className="text-destructive text-sm">
                  {form.formState.errors.confirmPassword?.message &&
                    form.formState.errors.confirmPassword.message}
                </Text>
              </View>
              <Button
                className="w-full"
                onPress={onSubmit}
                disabled={!enabledSubmitting}
              >
                <Text>Continue</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
