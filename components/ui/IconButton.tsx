import { LucideIcon, LucideProps } from 'lucide-react-native';
import React, { createElement } from 'react';
import { TouchableOpacity } from 'react-native';

type IconButtonProps = {
  icon: LucideIcon;
  iconProps?: LucideProps;
};

function IconButton({ icon, iconProps = {} }: IconButtonProps) {
  return (
    <TouchableOpacity className="h-[40x] aspect-square border-border border-[1px] items-center justify-center bg-card rounded-md">
      {createElement(icon, iconProps)}
    </TouchableOpacity>
  );
}

export default IconButton;
