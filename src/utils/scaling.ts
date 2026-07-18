import {
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

export const s = (size: number) => scale(size);

export const vs = (size: number) =>
  verticalScale(size);

export const ms = (
  size: number,
  factor = 0.5,
) => moderateScale(size, factor);