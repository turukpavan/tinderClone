import { Alert } from 'react-native';
import { ROUTES } from '../constants/routes';
import { RootStackParamList } from '../navigation/navigation';
import { sendOtp } from '../services/authService';
import OtpVerificationScreen from './OtpVerificationScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { getCurrentUserDoc } from '../services/userService';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.OTP_SCR>;

const OtpScreen = ({ route, navigation }: Props) => {
  const { phoneNumber } = route.params;
  const [confirmation, setConfirmation] = useState(route.params.confirmation);
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (code: string) => {
    try {
      setLoading(true);
 await confirmation.confirm(code);

Alert.alert("otp conform")
const userDoc = await getCurrentUserDoc();

userDoc.exists() ? 
    navigation.navigate(ROUTES.BOTTOM_TABS,{screen : 'STACK_SCR'})
      :     navigation.navigate(ROUTES.PROFILEPIC_UPLOAD_SCR)

    
    } catch (error) {
      Alert.alert(
        'Invalid code',
        'The code you entered is incorrect or has expired.',
        
      );
      console.log(error);
      
    } finally {
      setLoading(false)
    }
  };

  const handleResend = async () => {
    try {
      const newConfirmation = await sendOtp(phoneNumber);
      setConfirmation(newConfirmation);
    } catch (error: any) {
      Alert.alert(
        'Couldn’t resend',
        'Please try again in a moment.',
        error.code,
      );
    }
  };

  return (
    <OtpVerificationScreen
      channel="phone"
      destination={phoneNumber}
      onSubmit={handleSubmit}
      onResend={handleResend}
      onBack={() => navigation.goBack()}
      loading ={loading}
    />
  );
};

export default OtpScreen;
