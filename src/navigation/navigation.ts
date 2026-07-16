import { ConfirmationResult } from '@react-native-firebase/auth';
import { ROUTES } from '../constants/routes';
import { NavigatorScreenParams } from '@react-navigation/native';

type BottomTabParamList = {
  STACK_SCR: undefined;
  PROFILE: undefined;
  SETTINGS: undefined;
};

export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.PHONE_NUMBER_SCR]: undefined;
  [ROUTES.EMAIL_SCR]: undefined;
  [ROUTES.PROFILEPIC_UPLOAD_SCR] : undefined
  [ROUTES.OTP_SCR]: {
    confirmation: ConfirmationResult;
    phoneNumber: string;
  };
  [ROUTES.BOTTOM_TABS] : NavigatorScreenParams<BottomTabParamList>;
};