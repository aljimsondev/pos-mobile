import { Button } from '@/components/reusable/button';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Text } from '@/components/reusable/text';
import { fetchBrand } from '@/core/requests/fetch-brand';
import { brandFormSchema } from '@/lib/schema/product/create.brand';
import { fetcher } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function UpdateBrand() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetching } = useQuery({
    queryKey: [id],
    queryFn: () => fetchBrand(id),
  });

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

  useEffect(() => {
    if (data) {
      form.setValue('name', data.name);
      form.setValue('description', data.description || '');
      form.setValue('website_url', data.website_url || '');
      form.setValue('logo_url', data.logo_url || '');
    }
  }, [data]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      // added extra layer validation in case the zod validation skip the resolve
      const parsedData = brandFormSchema.parse(data);

      const res = await fetcher(`brand/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(parsedData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await res.json();

      if (res.status !== 200) {
        // something went wrong
        return Toast.error(
          body?.error?.message ||
            'Something went wrong! View logs for more info!',
          'bottom',
        );
      }

      // send toast notification
      Toast.success('Brand updated successfully!', 'bottom');
    } catch (e: any) {
      console.warn(e);

      Toast.error(
        e?.message || 'Something went wrong! View logs for more info!',
      );
    }
  });

  const enabledSubmit =
    Object.keys(form.formState.errors).length === 0 &&
    form.formState.isValid &&
    form.watch('name') &&
    form.watch('description');

  return (
    <KeyboardAvoidingView behavior="padding" className="p-4 flex-1 my-4">
      <View className="flex-1  gap-4">
        <View className="gap-1">
          <Label>Brand Name</Label>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                onChangeText={field.onChange}
                value={field.value}
                placeholder="adidas"
                error={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </View>
        <View className="gap-1">
          <Label>Description</Label>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                onChangeText={field.onChange}
                value={field.value}
                placeholder="adidas is ..."
                error={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </View>
        <View className="gap-1">
          <Label>Website URL (Optional)</Label>
          <Controller
            name="website_url"
            control={form.control}
            render={({ field, fieldState }) => (
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
      <Button onPress={onSubmit} disabled={!enabledSubmit}>
        <Text>Save Changes</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}
