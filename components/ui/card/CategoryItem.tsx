import { Text } from '@/components/reusable/text';
import { THEME } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Category } from '@aljimsondev/database-schema';
import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { Pressable, PressableProps, useColorScheme, View } from 'react-native';

interface CategoryNodeProps extends PressableProps {
  isChild?: boolean;
  isRoot?: boolean;
  label?: string;
  onPress: () => void; // override type
  selected?: boolean;
}

function CategoryNode({
  label,
  isChild,
  isRoot,
  className,
  onPress,
  selected = false,
  ...rest
}: CategoryNodeProps) {
  const onPressCheckbox = () => {
    onPress();
  };

  return (
    <Pressable
      className={cn(
        'p-2 items-center active:bg-muted rounded-md flex-1 justify-start flex-row gap-2 z-10',
        className,
      )}
      onPress={onPress}
      {...rest}
    >
      <Checkbox
        id="category_checkbox"
        className="z-0"
        onValueChange={onPressCheckbox}
        value={selected}
      />
      <Text>{label}</Text>
    </Pressable>
  );
}

interface CategoryItemProps extends Category {
  haveDescendants?: boolean;
  onPress: () => void;
  selected?: boolean;
}
export function CategoryItem({
  haveDescendants,
  name,
  selected = false,
  ...rest
}: CategoryItemProps & PressableProps) {
  const theme = useColorScheme() as 'dark' | 'light';

  const iconColor = THEME[theme].primary;

  return (
    <View className="rounded-md flex flex-1 items-center flex-row gap-2">
      <CategoryNode label={name} {...rest} selected={selected} />
      {haveDescendants && (
        <Pressable className="active:bg-muted rounded-full p-2">
          <Feather name="chevron-down" size={24} color={iconColor} />
        </Pressable>
      )}
    </View>
  );
}
