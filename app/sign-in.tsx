import { SignInForm } from '@/components/reusable/sign-in-form';
import { ScrollView } from 'react-native';

export default function SignIn() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="items-center justify-center mt-safe justify-center items-center h-full bg-card"
      keyboardDismissMode="interactive"
    >
      <SignInForm />
    </ScrollView>
  );
}
