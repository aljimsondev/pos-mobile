import { THEME } from '@/lib/theme';
import { useColorScheme } from 'react-native';

export default function useThemeVariables() {
  const theme = useColorScheme() as 'light' | 'dark';

  return THEME[theme];
}
