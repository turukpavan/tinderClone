import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendOtp } from '../services/authService';
import { ROUTES } from '../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation';
import { COLORS } from '../constants/colors';
import { ms, s, vs } from '../utils/scaling';

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTES.PHONE_NUMBER_SCR
>;

type Props = {
  navigation: NavigationType;
};
const PhoneNumberScreen = ({navigation} :Props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false)

  const isNextEnabled = phoneNumber.trim().length >= 10;

 const handleNext = async () => {
  setLoading(true)
  if (!isNextEnabled) return;
  const fullPhoneNumber = `+91${phoneNumber.trim()}`;
  
  try {
    const confirmation = await sendOtp(fullPhoneNumber);
    console.log(confirmation);
    
    if (!confirmation) {
      console.log('phone number error: no confirmation returned');
      return; 
    }
    navigation.navigate(ROUTES.OTP_SCR, { confirmation, phoneNumber: fullPhoneNumber });
  } catch (error) {
    console.log('phone number error', error);
  }finally{
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Back button */}
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Can we get your{'\n'}number?</Text>

          {/* Phone input row */}
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
                onChangeText={setPhoneNumber}
                autoFocus
              />
            </View>
          </View>

          {/* Disclaimer text */}
          <Text style={styles.disclaimer}>
            By entering your number, you agree to get texts about your
            account, like verification codes, account alerts, reminders, and
            updates (e.g. Likes, matches, unread messages).
            {'\n\n'}
            Message frequency varies and data rates may apply. Reply STOP to
            cancel.
          </Text>
        </View>

        {/* Next button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: isNextEnabled ? 1 : 0.5 },
          ]}
          activeOpacity={0.8}
          onPress={handleNext}
          disabled={!isNextEnabled || loading}
        >
          <Text style={styles.nextButtonText}>{loading ? 'Please Wait...':'Next'}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default PhoneNumberScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK,
  },

  flex: {
    flex: 1,
  },

  backButton: {
    marginTop: vs(12),
    marginLeft: s(20),
    width: s(40),
    height: vs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },

  backArrow: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(26),
  },

  content: {
    flex: 1,
    paddingHorizontal: s(24),
    marginTop: vs(24),
  },

  title: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(35),
    fontWeight: '700',
    lineHeight: vs(46),
    marginBottom: vs(40),
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: vs(32),
  },

  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_BORDER,
    paddingBottom: vs(10),
    marginRight: s(16),
  },

  countryCodeText: {
    color: COLORS.COLOR_SECONDARY_TEXT,
    fontSize: ms(20),
    marginRight: s(4),
  },

  chevron: {
    color: COLORS.COLOR_SECONDARY_TEXT,
    fontSize: ms(14),
    marginBottom: vs(2),
  },

  phoneInputWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_LIGHT,
    paddingBottom: vs(10),
  },

  phoneInput: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(20),
    padding: 0,
  },

  disclaimer: {
    color: COLORS.COLOR_PLACEHOLDER,
    fontSize: ms(15),
    lineHeight: vs(22),
  },

  nextButton: {
    backgroundColor: COLORS.BACKGROUND_NXTBTN,
    borderRadius: ms(30),
    marginHorizontal: s(24),
    marginBottom: vs(32),
    paddingVertical: vs(18),
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextButtonText: {
    color: COLORS.COLOR_NXTBTN,
    fontSize: ms(18),
    fontWeight: '600',
  },
});

