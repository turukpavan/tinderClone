import React from 'react';
import { LucideProps } from 'lucide-react-native';

import {
  Mail,
  Phone,
  Flame,
  MessageCircleHeart,
  User,
} from 'lucide-react-native';

const icons = {
  Mail,
  Phone,
  Flame,
  MessageCircleHeart,
  User,
};

type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon {...props} />;
};

export default Icon;
