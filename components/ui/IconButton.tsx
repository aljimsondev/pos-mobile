import { THEME } from '@/lib/theme';
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
}

function IconButton({ icon, className, ...rest }: IconButtonProps) {
  const theme = useColorScheme() as 'dark' | 'light';

  const iconColor = THEME[theme].primary;

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={1}
      className={cn(
        'h-10 w-10 border-border bg-background border-[1px] items-center justify-center rounded-md active:bg-muted disabled:opacity-50',
        className,
      )}
    >
      {icon(iconColor)}
    </TouchableOpacity>
  );
}

export default IconButton;
