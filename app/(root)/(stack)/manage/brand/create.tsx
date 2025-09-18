import { Button } from '@/components/reusable/button';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Text } from '@/components/reusable/text';
import { brandFormSchema } from '@/lib/schema/product/create.brand';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';

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
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <KeyboardAvoidingView behavior="padding" className="p-4 flex-1 my-4">
      <View className="flex-1  gap-4">
        <View className="gap-1">
          <Label>Brand Name</Label>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => <Input {...field} placeholder="adidas" />}
          />
        </View>
        <View className="gap-1">
          <Label>Description</Label>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <Input {...field} placeholder="adidas is ..." />
            )}
          />
        </View>
        <View className="gap-1">
          <Label>Website URL (Optional)</Label>
          <Controller
            name="website_url"
            control={form.control}
            render={({ field }) => (
              <Input {...field} placeholder="https://www.site.com" />
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
                {...field}
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
