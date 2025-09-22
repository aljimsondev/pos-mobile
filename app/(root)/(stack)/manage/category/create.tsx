import { Button } from '@/components/reusable/button';
import { Input } from '@/components/reusable/input';
import { Label } from '@/components/reusable/label';
import { Text } from '@/components/reusable/text';
import {
  CategoryFormSchema,
  categoryFormSchema,
} from '@/lib/schema/product/create.category';
import { fetcher } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function CreateCategory() {
  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      image_url: '',
      parent_id: '',
    },
    mode: 'all',
  });

  const enabledSubmit =
    Object.keys(form.formState.errors).length === 0 &&
    form.formState.isValid &&
    form.watch('name');

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      // added extra layer validation in case the zod validation skip the resolve
      const parsedData = categoryFormSchema.parse(data);

      const fieldData: CategoryFormSchema = {
        name: parsedData.name,
      };

      if (parsedData.image_url) {
        fieldData.image_url = parsedData.image_url;
      }
      if (parsedData.parent_id) {
        fieldData.parent_id = parsedData.parent_id;
      }

      const res = await fetcher('category/create', {
        method: 'POST',
        body: JSON.stringify(fieldData),
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
      Toast.success('Brand added successfully!', 'bottom');
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
          <Label>Category Name</Label>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                onChangeText={field.onChange}
                value={field.value}
                placeholder="Electronics"
                error={Boolean(fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </View>
        <View className="gap-1">
          <Label>Image URL (Optional)</Label>
          <Controller
            name="image_url"
            control={form.control}
            render={({ field }) => (
              <Input
                onChangeText={field.onChange}
                value={field.value}
                placeholder="ex. https://www.site.com/photo/logo.png"
              />
            )}
          />
        </View>
      </View>
      <Button disabled={!enabledSubmit} onPress={onSubmit}>
        <Text>Submit</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}
