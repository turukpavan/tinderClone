// screens/OtpScreen.tsx — now thin
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../navigation/navigation';
import OtpVerification from '../../components/OtpVerification';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useOtpVerification } from '../../hooks/useOtpVerification';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.OTP_SCR>;

const OtpScreen = ({ route, navigation }: Props) => {
  const { phoneNumber } = route.params;

  const { loading, resending, resendCooldown, handleSubmit, handleResend } =
    useOtpVerification(
      phoneNumber,
      (isNewUser) => {
        if (isNewUser) {
          navigation.navigate(ROUTES.PROFILEPIC_UPLOAD_SCR);
        } else {
          navigation.navigate(ROUTES.BOTTOM_TABS, { screen: ROUTES.STACK_SCR });
        }
      },
      () => navigation.goBack(),
    );

  return (
    <OtpVerification
      channel="phone"
      destination={phoneNumber}
      onSubmit={handleSubmit}
      onResend={handleResend}
      onBack={() => navigation.goBack()}
      loading={loading}
      resending={resending}
      resendCooldown={resendCooldown}
      expiryText="This code expires in 10 minutes."
    />
  );
};

export default OtpScreen;