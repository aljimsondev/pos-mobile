import { SignUpForm } from '@/components/reusable/sign-up-form';
import { ScrollView } from 'react-native';

export default function SignUp() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="items-center justify-center p-4 h-full mt-safe"
      keyboardDismissMode="interactive"
    >
      <SignUpForm />
    </ScrollView>
  );
}
