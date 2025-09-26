import { THEME, ThemeColor } from '@/lib/theme';
import { cn } from '@/lib/utils';
import {} from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
  icon: (color: string) => ReactNode;
  iconTheme?: ThemeColor;
}

function IconButton({
  icon,
  className,
  iconTheme = 'primary',
  activeOpacity = 1,
  ...rest
}: IconButtonProps) {
  const theme = useColorScheme() as 'dark' | 'light';

  const iconColor = THEME[theme][iconTheme];

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={activeOpacity}
      className={cn(
        'h-10 w-10 border-border bg-background border-[1px] z-10 items-center justify-center rounded-md active:bg-muted disabled:opacity-50',
        className,
      )}
    >
      {icon(iconColor)}
    </TouchableOpacity>
  );
}

export default IconButton;
