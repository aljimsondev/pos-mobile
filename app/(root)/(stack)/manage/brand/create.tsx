import { Button } from '@/components/reusable/button';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Text } from '@/components/reusable/text';
import { brandFormSchema } from '@/lib/schema/product/create.brand';
import { fetcher } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function CreateNewBrand() {
  const form = useForm({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      description: '',
      logo_url: '',
      metadata: {},
      name: '',
      website_url: '',
    },
    mode: 'all',
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetcher('brand/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const body = await res.json();

      if (res.status !== 201) {
        // something went wrong
        return Toast.error(
          body?.error?.message ||
            'Something went wrong! View logs for more info!',
          'bottom',
        );
      }

      // reset form
      form.reset();
      // send toast notification
      Toast.success('Brand added successfully!');
    } catch (e: any) {
      console.warn(e);

      Toast.error(
        e?.message || 'Something went wrong! View logs for more info!',
      );
    }
  });

  return (
    <KeyboardAvoidingView behavior="padding" className="p-4 flex-1 my-4">
      <View className="flex-1  gap-4">
        <View className="gap-1">
          <Label>Brand Name</Label>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <Input
                onChangeText={field.onChange}
                value={field.value}
                placeholder="adidas"
              />
            )}
          />
        </View>
        <View className="gap-1">
          <Label>Description</Label>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <Input
                onChangeText={field.onChange}
                value={field.value}
                placeholder="adidas is ..."
              />
            )}
          />
        </View>
        <View className="gap-1">
          <Label>Website URL (Optional)</Label>
          <Controller
            name="website_url"
            control={form.control}
            render={({ field }) => (
              <Input
                onChangeText={field.onChange}
                value={field.value}
                placeholder="https://www.site.com"
              />
            )}
          />
        </View>
        <View className="gap-1">
          <Label>Logo URL (Optional)</Label>
          <Controller
            name="logo_url"
            control={form.control}
            render={({ field }) => (
              <Input
                onChangeText={field.onChange}
                value={field.value}
                placeholder="https://www.site.com/asset/logo.png"
              />
            )}
          />
        </View>
      </View>
      <Button onPress={onSubmit}>
        <Text>Submit</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}
