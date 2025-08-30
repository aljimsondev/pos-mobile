import { authClient } from '@/lib/auth/client';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log('Signing in...');

      // const res = await fetch('http://192.168.100.17:4001/api/v1/_auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });
      // console.log(res.status);
      // const body = await res.json();
      // console.log(body);

      const res1 = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onError: (e) => {
            console.log(e.error);
          },
          onSuccess: () => {
            router.replace('/(root)');
          },
        },
      );

      console.log(res1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
