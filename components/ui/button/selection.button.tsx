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
  ...rest
}: ViewProps & {
  onPress?: TouchableOpacityProps['onPress'];
  label: string;
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
        <Text>{label}</Text>
        <Ionicons name="chevron-down" />
      </View>
    </TouchableOpacity>
  );
}
