import {
  ConfirmationResult,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuthErrorMessage } from '../utils/authErrors';
import { toaster } from '../utils/toaster';

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();

    if (response.type !== 'success') {
      throw new Error('Google sign-in cancelled');
    }

    const { idToken } = response.data;

    if (!idToken) {
      throw new Error('No ID token returned from Google Sign-In');
    }

    const { accessToken } = await GoogleSignin.getTokens();

    const googleCredential = GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );

    const auth = getAuth();

    const userCredential = await signInWithCredential(
      auth,
      googleCredential,
    );

    const isNewUser =
      userCredential.additionalUserInfo?.isNewUser;

    toaster.success(
      isNewUser ? 'Account created' : 'Login successful',
    );

    return isNewUser;
  } catch (error) {
    console.log(error);

    toaster.error(
      'Google Sign-In Failed',
      getAuthErrorMessage(error),
    );

    throw error;
  }
};

export const sendOtp = async (
  phoneNumber: string,
): Promise<ConfirmationResult> => {
  const auth = getAuth();

  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
    );

    toaster.success(
      'OTP Sent',
      'Check your phone for the verification code',
    );

    return confirmation;
  } catch (error) {
    toaster.error(
      'Failed to send OTP',
      getAuthErrorMessage(error),
    );

    throw error;
  }
};

export const signInOrSignUp = async (
  email: string,
  password: string,
) => {
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    toaster.success(
      'Login successful',
      `Welcome ${userCredential.user.email}`,
    );

    return {
      user: userCredential.user,
      isNewUser: false,
    };
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

      toaster.success('Account created successfully');

      return {
        user: userCredential.user,
        isNewUser: true,
      };
    }

    toaster.error(
      'Authentication failed',
      getAuthErrorMessage(error),
    );

    throw error;
  }
};