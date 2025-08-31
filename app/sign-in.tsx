import { SignInForm } from '@/components/reusable/sign-in-form';
import { ScrollView } from 'react-native';

export default function SignIn() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="flex-1 bg-card"
      keyboardDismissMode="interactive"
    >
      <SignInForm />
    </ScrollView>
  );
}
