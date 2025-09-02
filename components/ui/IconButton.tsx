import { cn } from '@/lib/utils';
import { LucideIcon, LucideProps } from 'lucide-react-native';
import React, { createElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
  icon: LucideIcon;
  iconProps?: LucideProps;
}

function IconButton({
  icon,
  iconProps = {},
  className,
  ...rest
}: IconButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={1}
      className={cn(
        'h-10 w-10 border-border border-[1px] items-center justify-center bg-card rounded-md active:bg-muted',
        className,
      )}
    >
      {createElement(icon, iconProps)}
    </TouchableOpacity>
  );
}

export default IconButton;
