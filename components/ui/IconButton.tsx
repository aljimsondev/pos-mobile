import { cn } from '@/lib/utils';
import {} from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
  icon: ReactNode;
}

function IconButton({ icon, className, ...rest }: IconButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={1}
      className={cn(
        'h-10 w-10 border-border border-[1px] items-center justify-center bg-card rounded-md active:bg-muted',
        className,
      )}
    >
      {icon}
    </TouchableOpacity>
  );
}

export default IconButton;
