import { Text } from '@/components/reusable/text';
import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';

export default function SelectionButton({
  className,
  onPress = () => {},
  label,
  value,
  ...rest
}: ViewProps & {
  onPress?: TouchableOpacityProps['onPress'];
  label: string;
  value?: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        {...rest}
        className={cn(
          'h-10 px-2 bg-card border-border border-[1px] rounded-md flex items-center flex-row gap-2',
          className,
        )}
      >
        <Text className="text-muted-foreground">{value ? value : label}</Text>
        <Ionicons name="chevron-down" />
      </View>
    </TouchableOpacity>
  );
}
