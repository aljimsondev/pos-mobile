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
import { cn } from '@/lib/utils';
import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  type TextInput,
  View,
} from 'react-native';

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  async function onSubmit() {
    setError('');
    const result = await authClient.signIn.email({
      email,
      password,
    });

    if (!result?.data) {
      setError(result.error?.message || '');
    }
  }

  return (
    <KeyboardAvoidingView
      className="w-full flex-1 items-center justify-center"
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5 w-full bg-transparent">
        <CardHeader>
          <View className="w-full justify-center items-center mb-8">
            <Text style={{ fontFamily: 'NicoMoji', fontSize: 36 }}>POS</Text>
          </View>
          <CardTitle className="text-center text-xl sm:text-left">
            Sign in to your app
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label
                htmlFor="email"
                className={cn(error ? 'text-destructive' : '')}
              >
                Email
              </Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
                value={email}
                onChangeText={setEmail}
                className={cn(
                  error ? 'border-destructive text-destructive' : '',
                )}
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label
                  htmlFor="password"
                  className={cn(error ? 'text-destructive' : '')}
                >
                  Password
                </Label>
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}
                >
                  <Text className="font-normal leading-4">
                    Forgot your password?
                  </Text>
                </Button>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={onSubmit}
                value={password}
                onChangeText={setPassword}
                className={cn(
                  error ? 'border-destructive text-destructive' : '',
                )}
              />
              <Text className={cn(error ? 'text-destructive' : '')}>
                {error}
              </Text>
            </View>
            <Button className="w-full" onPress={onSubmit}>
              <Text>Continue</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </KeyboardAvoidingView>
  );
}
