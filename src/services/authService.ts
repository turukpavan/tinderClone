import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ConfirmationResult,  createUserWithEmailAndPassword,  getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, signInWithPhoneNumber } from '@react-native-firebase/auth';

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

    const googleCredential = GoogleAuthProvider.credential(idToken, accessToken);

    const auth = getAuth();
    const userCredential = await signInWithCredential(auth, googleCredential);
    const isNewUser = userCredential.additionalUserInfo?.isNewUser;


    console.log(userCredential.user);
    return isNewUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const sendOtp = async (
  phoneNumber: string,
): Promise<ConfirmationResult> => {
  const auth = getAuth();

  return signInWithPhoneNumber(auth, phoneNumber);
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

    return {
      user: userCredential.user,
      isNewUser: false,
    };
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      return {
        user: userCredential.user,
        isNewUser: true,
      };
    }

    throw error;
  }
};