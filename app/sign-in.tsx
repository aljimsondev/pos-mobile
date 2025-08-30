import { SignInForm } from '@/components/reusable/sign-in-form';
import { View } from 'react-native';

export default function SignIn() {
  return (
    <View className="justify-center items-center h-full p-4">
      <SignInForm />
    </View>
  );
}
