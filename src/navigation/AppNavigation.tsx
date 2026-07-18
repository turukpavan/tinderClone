import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { ROUTES } from '../constants/routes';
import { RootStackParamList } from '../navigation/navigation';
import LoginScreen from '../screens/LoginScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import EmailScreen from '../screens/EmailScreen';
import OtpScreen from '../screens/OtpScreen';
import ProfilePictureUploadScreen from '../screens/ProfilePictureUploadScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import BottomTabs from './BottomTabs';
import Loader from '../components/Loader';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);



  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      setInitializing(false); 
    });
    
    return subscriber; 
  }, []);
  if (initializing) <Loader />

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name={ROUTES.BOTTOM_TABS} component={BottomTabs} />
            <Stack.Screen name={ROUTES.CHAT_ROOM_SCR} component={ChatRoomScreen} />
            <Stack.Screen
              name={ROUTES.UPDATEPROFILE_SCR}
              component={UpdateProfileScreen}
            />
            <Stack.Screen
              name={ROUTES.PROFILEPIC_UPLOAD_SCR}
              component={ProfilePictureUploadScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.EMAIL_SCR} component={EmailScreen} />
            <Stack.Screen name={ROUTES.OTP_SCR} component={OtpScreen} />
            <Stack.Screen
              name={ROUTES.PHONE_NUMBER_SCR}
              component={PhoneNumberScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigation;