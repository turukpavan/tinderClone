import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

interface AppIconProps {
  source: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const AppIcon = ({ source, size = 24, style }: AppIconProps) => {
  return (
    <Image
      source={source}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
};

export default AppIcon;
