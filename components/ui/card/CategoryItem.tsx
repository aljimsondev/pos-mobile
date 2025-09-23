import { Text } from '@/components/reusable/text';
import { THEME } from '@/lib/theme';
import { Category } from '@aljimsondev/database-schema';
import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { Pressable, useColorScheme, View } from 'react-native';

interface CategoryNodeProps {
  isChild?: boolean;
  isRoot?: boolean;
  label?: string;
}

function CategoryNode({ label }: CategoryNodeProps) {
  return (
    <Pressable className="p-2 items-center active:bg-muted rounded-md flex-1 justify-start flex-row gap-2">
      <Checkbox id="category_checkbox" />
      <Text>{label}</Text>
    </Pressable>
  );
}

interface CategoryItemProps extends Category {
  haveDescendants?: boolean;
}
export function CategoryItem({
  haveDescendants,
  name,
  ...rest
}: CategoryItemProps) {
  const theme = useColorScheme() as 'dark' | 'light';

  const iconColor = THEME[theme].primary;

  return (
    <View className="rounded-md flex items-center flex-row gap-2">
      <CategoryNode label={name} />
      {haveDescendants && (
        <Pressable className="active:bg-muted rounded-full p-2">
          <Feather name="chevron-down" size={24} color={iconColor} />
        </Pressable>
      )}
    </View>
  );
}
