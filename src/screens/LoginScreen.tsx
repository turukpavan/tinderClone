import { StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import React from 'react';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from '../components/Icon';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/routes';

import { RootStackParamList } from '../navigation/navigation';
import { signInWithGoogle } from '../services/authService';

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTES.LOGIN
>;

type Props = {
  navigation: NavigationType;
};

const LoginScreen = ({ navigation }: Props) => {
    const isDarkMode = useColorScheme() === 'light';
  
  const handleGoogleLogin = async () => {
  try {
   const isNewUser = await signInWithGoogle();


   isNewUser ? navigation.navigate(ROUTES.PROFILEPIC_UPLOAD_SCR) : navigation.navigate(ROUTES.BOTTOM_TABS,{
    screen : 'STACK_SCR'
   })
  } catch (error) {
    console.log(error);
  }
};
  return (
    
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={COLORS.BACKGROUND_RED}/>
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
        >
          <Text style={styles.iconGoogle}>G</Text>
          <Text>Continue With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.PHONE_NUMBER_SCR)}
          activeOpacity={0.8}
          style={styles.loginWithContainer}
        >
          <Icon name="Phone" color={COLORS.COLOR_DARK} />
          <Text>Continue With Phone Number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.EMAIL_SCR)}
          activeOpacity={0.8}
          style={styles.loginWithContainer}
        >
          <Icon name="Mail" color={COLORS.COLOR_DARK} />
          <Text>Continue With Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_RED,
    padding: 20,
  },

  section1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tinder: {
    color: COLORS.COLOR_LIGHT,
    fontSize: 55,
    fontWeight: '900',
  },

  section2: {
    flex: 1,
  },

  policyTxt: {
    color: COLORS.COLOR_LIGHT,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 20,
  },

  underLine: {
    textDecorationLine: 'underline',
  },

  loginWithContainer: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    marginBottom: 10,
    padding: 15,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  iconGoogle: {
    color: COLORS.COLOR_DARK,
    fontSize: 24,
    fontWeight: '700',
  },
});