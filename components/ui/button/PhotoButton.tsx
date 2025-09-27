import useThemeVariables from '@/hooks/useThemeVariables';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Pressable } from 'react-native';

export interface PhotoButtonProps {
  onSelectImage: (result: ImagePicker.ImagePickerResult) => void;
}

export default function PhotoButton({ onSelectImage }: PhotoButtonProps) {
  const themeColor = useThemeVariables();

  const handleOpenImagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onSelectImage(result);
    }
  };

  return (
    <Pressable
      className="p-4 rounded-md border-[1px] border-border aspect-[3/4] w-[80px] flex items-center justify-center active:bg-muted"
      onPress={handleOpenImagePicker}
    >
      <MaterialIcons
        name="add-photo-alternate"
        size={36}
        color={themeColor.mutedForeground}
      />
    </Pressable>
  );
}
