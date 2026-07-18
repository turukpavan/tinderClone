import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/colors';

interface LoaderProps {
  size?: 'small' | 'large' | number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

const Loader = ({
  size = 'large',
  color = COLORS.BACKGROUND_RED,
  backgroundColor = COLORS.BACKGROUND_LIGHT,
  style,
}: LoaderProps) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});