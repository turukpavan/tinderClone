import { ConfirmationResult } from '@react-native-firebase/auth';
import { ROUTES } from '../constants/routes';
import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  [ROUTES.STACK_SCR]: undefined;
  [ROUTES.CHAT_LIST_SCR]: undefined;
  [ROUTES.PROFILE_SCR]: undefined;
};

type ChatUser = {
  id: string;
  name: string;
  profileImage: string;
};
export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.PHONE_NUMBER_SCR]: undefined;
  [ROUTES.EMAIL_SCR]: undefined;
  [ROUTES.PROFILEPIC_UPLOAD_SCR]: undefined;
  [ROUTES.UPDATEPROFILE_SCR]: undefined;

  [ROUTES.OTP_SCR]: {
    confirmation: ConfirmationResult;
    phoneNumber: string;
  };
   [ROUTES.CHAT_ROOM_SCR]: {
    matchId: string;
    user : ChatUser
  };

  [ROUTES.BOTTOM_TABS]: NavigatorScreenParams<BottomTabParamList>;
};