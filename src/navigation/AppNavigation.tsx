import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../constants/routes';
import LoginScreen from '../screens/LoginScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import EmailScreen from '../screens/EmailScreen';

import { RootStackParamList } from '../navigation/navigation';
import OtpScreen from '../screens/OtpScreen';
import BottomTabs from './BottomTabs';
import ProfilePictureUploadScreen from '../screens/ProfilePictureUploadScreen ';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
      <SafeAreaView
          style={{ flex: 1 }}
          edges={['top']}>

    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
      />

      <Stack.Screen
        name={ROUTES.PHONE_NUMBER_SCR}
        component={PhoneNumberScreen}
      />

      <Stack.Screen
        name={ROUTES.EMAIL_SCR}
        component={EmailScreen}
      />
       <Stack.Screen
        name={ROUTES.OTP_SCR}
        component={OtpScreen}
      />
       <Stack.Screen
        name={ROUTES.PROFILEPIC_UPLOAD_SCR}
        component={ProfilePictureUploadScreen}
      />

      <Stack.Screen
        name={ROUTES.BOTTOM_TABS}
        component = {BottomTabs}
      />
       <Stack.Screen
        name={ROUTES.UPDATEPROFILE_SCR}
        component = {UpdateProfileScreen}
      />
       <Stack.Screen
        name={ROUTES.CHAT_ROOM_SCR}
        component = {ChatRoomScreen}
      />
    </Stack.Navigator>
              </SafeAreaView>

  );
};

export default AppNavigation;