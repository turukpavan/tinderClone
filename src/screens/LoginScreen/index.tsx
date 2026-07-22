import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback } from 'react';
const google = require('../../assets/icons/google.png');
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from '../../components/Icon';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';

import { RootStackParamList } from '../../navigation/navigation';
import { signInWithGoogle } from '../../services/authService';
import AppIcon from '../../components/AppIcon';
import { runWithAuthHandling } from '../../utils/runWithAuthHandling';
import { styles } from './styles';
import Loader from '../../components/Loader';

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTES.LOGIN
>;

type Props = {
  navigation: NavigationType;
};

const LoginScreen = ({ navigation }: Props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = useCallback(async () => {
    if (isLoggingIn) return;

    const result = await runWithAuthHandling(
      () => signInWithGoogle(),
      { setLoading: setIsLoggingIn, errorTitle: 'Login failed' },
    );

    if (!result.success) return;

    if (result.data) {
      navigation.navigate(ROUTES.PROFILEPIC_UPLOAD_SCR);
    } else {
      navigation.navigate(ROUTES.BOTTOM_TABS, { screen: ROUTES.STACK_SCR });
    }
  }, [isLoggingIn, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={COLORS.BACKGROUND_RED} />

      <View style={styles.section1}>
        <Text style={styles.tinder}>TINDER</Text>
      </View>

      <View style={styles.section2}>
        <Text style={styles.policyTxt}>
          By tapping 'Continue' you agree to our
          <Text style={styles.underLine}> Terms</Text>. Learn how we process your
          data in our
          <Text style={styles.underLine}> Privacy Policy </Text>
          and
          <Text style={styles.underLine}> Cookies Policy</Text>.
        </Text>

        <TouchableOpacity
          onPress={handleGoogleLogin}
          activeOpacity={0.8}
          style={styles.loginWithContainer}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <Loader size='small' color={COLORS.COLOR_DARK}/> 
          ) : (
            <>
              <AppIcon source={google} size={23} />
              <Text style={styles.buttonText}>Continue With Google</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.PHONE_NUMBER_SCR)}
          activeOpacity={0.8}
          style={styles.loginWithContainer}
        >
          <Icon name="Phone" color={COLORS.COLOR_DARK} />
          <Text style={styles.buttonText}>Continue With Phone Number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.EMAIL_SCR)}
          activeOpacity={0.8}
          style={styles.loginWithContainer}
        >
          <Icon name="Mail" color={COLORS.COLOR_DARK} />
          <Text style={styles.buttonText}>Continue With Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

