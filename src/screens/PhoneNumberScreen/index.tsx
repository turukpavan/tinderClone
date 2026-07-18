import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendOtp } from '../../services/authService';
import { ROUTES } from '../../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/navigation';
import { otpStore } from '../../services/otpStore';
import { runWithAuthHandling } from '../../utils/runWithAuthHandling';
import { sanitizePhoneInput, isValidPhoneNumber, MAX_PHONE_LENGTH } from '../../utils/phoneValidation';
import { styles } from './styles';

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTES.PHONE_NUMBER_SCR
>;

type Props = {
  navigation: NavigationType;
};


const PhoneNumberScreen = ({ navigation }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const isNextEnabled = isValidPhoneNumber(phoneNumber)

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(sanitizePhoneInput(text));
  };

const handleNext = async () => {
  if (!isNextEnabled || loading) return;

  const fullPhoneNumber = `+91${phoneNumber}`;

  const result = await runWithAuthHandling(
    () => sendOtp(fullPhoneNumber),
    { setLoading, errorTitle: 'Failed to send code' },
  );

  if (!result.success) return;

  otpStore.set(result.data);
  navigation.navigate(ROUTES.OTP_SCR, { phoneNumber: fullPhoneNumber });
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
          disabled={loading}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Can we get your{'\n'}number?</Text>

          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.countryCode} activeOpacity={0.7}>
              <Text style={styles.countryCodeText}>IN +91</Text>
              <Text style={styles.chevron}>▾</Text>
            </TouchableOpacity>

            <View style={styles.phoneInputWrapper}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone Number"
                placeholderTextColor="#8A8A8E"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                maxLength={MAX_PHONE_LENGTH}
                autoFocus
                editable={!loading}
              />
            </View>
          </View>

          <Text style={styles.disclaimer}>
            By entering your number, you agree to get texts about your
            account, like verification codes, account alerts, reminders, and
            updates (e.g. Likes, matches, unread messages).
            {'\n\n'}
            Message frequency varies and data rates may apply. Reply STOP to
            cancel.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, { opacity: isNextEnabled ? 1 : 0.5 }]}
          activeOpacity={0.8}
          onPress={handleNext}
          disabled={!isNextEnabled || loading}
        >
          <Text style={styles.nextButtonText}>
            {loading ? 'Please Wait...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;



