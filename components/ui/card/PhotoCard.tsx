import useThemeVariables from '@/hooks/useThemeVariables';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

export interface PhotoCardProps {
  uri?: string;
  onRemovePhoto?: () => void;
}
export default function PhotoCard({ uri, onRemovePhoto }: PhotoCardProps) {
  const themeColor = useThemeVariables();
  return (
    <View className="relative">
      {onRemovePhoto && (
        <Pressable
          className="bg-card active:bg-muted p-1 border-[1px] border-border items-center justify-center rounded-full z-20 absolute -top-1 -right-1"
          onPress={onRemovePhoto}
        >
          <Ionicons name="close" size={17} color={themeColor.destructive} />
        </Pressable>
      )}
      <View className="rounded-md border-[1px] border-border relative aspect-[3/4] w-[80px] overflow-hidden flex items-center justify-center">
        <Image
          source={{ uri: uri }}
          style={{ width: '100%', aspectRatio: 3 / 4 }}
          contentFit="cover"
          contentPosition="center"
        />
      </View>
    </View>
  );
}
