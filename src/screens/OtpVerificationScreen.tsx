import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { s, vs, ms } from '../utils/scaling';

type OtpChannel = 'phone' | 'email';

 interface OtpVerificationScreenProps {
  channel: OtpChannel;
  destination: string;
  length?: number;
  onComplete?: (code: string) => void;
  onSubmit?: (code: string) => void;
  onResend?: () => void;
  onBack?: () => void;
  loading : boolean
  expiryText?: string;
}

const DIGIT_REGEX = /^[0-9]$/;

const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  channel,
  destination,
  length = 6,
  onComplete,
  onSubmit,
  onResend,
  onBack,
  loading,
  expiryText,
}) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);

  const code = useMemo(() => digits.join(''), [digits]);
  const isComplete = code.length === length;

  const handleChangeText = useCallback(
    (text: string, index: number) => {
      if (text.length > 1) {
        const pasted = text.replace(/[^0-9]/g, '').slice(0, length).split('');
        const next = Array(length).fill('');
        pasted.forEach((d, i) => (next[i] = d));
        setDigits(next);
        const lastFilled = Math.min(pasted.length, length) - 1;
        if (lastFilled >= 0) inputs.current[Math.min(lastFilled, length - 1)]?.focus();
        if (pasted.length === length) onComplete?.(next.join(''));
        return;
      }

      if (text !== '' && !DIGIT_REGEX.test(text)) return;

      setDigits((prev) => {
        const next = [...prev];
        next[index] = text;
        if (text !== '' && index < length - 1) {
          inputs.current[index + 1]?.focus();
        }
        if (next.every((d) => d !== '')) {
          onComplete?.(next.join(''));
        }
        return next;
      });
    },
    [length, onComplete]
  );

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && digits[index] === '' && index > 0) {
        inputs.current[index - 1]?.focus();
        setDigits((prev) => {
          const next = [...prev];
          next[index - 1] = '';
          return next;
        });
      }
    },
    [digits]
  );

  const handleResend = useCallback(() => {
    setDigits(Array(length).fill(''));
    inputs.current[0]?.focus();
    onResend?.();
  }, [length, onResend]);

  const subtitle =
    channel === 'email' ? (
      <Text style={styles.subtitle}>
        Sent to <Text style={styles.subtitleBold}>{destination}</Text>.
        {expiryText ? `\n${expiryText}` : ''}
      </Text>
    ) : (
      <Text style={styles.subtitle}>{destination}</Text>
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={styles.backArrow}>{'‹'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Enter your code</Text>

      <View style={styles.subtitleContainer}>{subtitle}</View>

      <View style={styles.otpRow}>
        {digits.map((digit, index) => (
          <View key={index} style={styles.otpBoxWrapper}>
            <TextInput
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={length}
              autoFocus={index === 0}
              caretHidden
            />
            <View
              style={[
                styles.underline,
                index === 0 || digit !== '' ? styles.underlineActive : styles.underlineInactive,
              ]}
            />
          </View>
        ))}
      </View>

      {channel === 'email' ? (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendLink}>Resend via email</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.helperText}>Didn’t get anything? No worries, let’s try again.</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.nextButton, isComplete && styles.nextButtonActive]}
        disabled={!isComplete}
        onPress={() => onSubmit?.(code)}
      >
        <Text style={[styles.nextButtonText, isComplete && styles.nextButtonTextActive]}>
          {loading ? 'Please Wait...' : 'next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default OtpVerificationScreen;

const BOX_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK,
    paddingHorizontal: s(24),
    paddingTop: vs(16),
  },

  backButton: {
    width: ms(40),
    height: ms(40),
    justifyContent: 'center',
  },

  backArrow: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(28),
    fontWeight: '600',
  },

  title: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(32),
    fontWeight: '800',
    marginTop: vs(24),
  },

  subtitleContainer: {
    marginTop: vs(16),
  },

  subtitle: {
    color: COLORS.COLOR_SUBTITLE,
    fontSize: ms(16),
    lineHeight: vs(22),
  },

  subtitleBold: {
    color: COLORS.COLOR_LIGHT,
    fontWeight: '700',
  },

  otpRow: {
    flexDirection: 'row',
    marginTop: vs(40),
  },

  otpBoxWrapper: {
    width: ms(BOX_SIZE),
    marginRight: s(16),
    alignItems: 'center',
  },

  otpInput: {
    width: ms(BOX_SIZE),
    height: vs(44),
    color: COLORS.BACKGROUND_LIGHT,
    fontSize: ms(22),
    textAlign: 'center',
    padding: 0,
  },

  underline: {
    width: '100%',
    height: vs(2),
    borderRadius: ms(1),
    marginTop: vs(4),
  },

  underlineActive: {
    backgroundColor: COLORS.ACTIVE_OTPUNDERLINE,
  },

  underlineInactive: {
    backgroundColor: COLORS.INACTIVE_OTPUNDERLINE,
  },

  resendLink: {
    color: COLORS.COLOR_LINK,
    fontSize: ms(16),
    fontWeight: '700',
    marginTop: vs(20),
  },

  helperText: {
    color: COLORS.COLOR_PLACEHOLDER,
    fontSize: ms(15),
    marginTop: vs(32),
    lineHeight: vs(20),
  },

  nextButton: {
    marginTop: vs(24),
    height: vs(52),
    borderRadius: ms(26),
    backgroundColor: COLORS.BACKGROUND_NXTBTN,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextButtonActive: {
    backgroundColor: COLORS.BACKGROUND_RED,
  },

  nextButtonText: {
    color: COLORS.COLOR_NXTBTN,
    fontSize: ms(16),
    fontWeight: '700',
  },

  nextButtonTextActive: {
    color: COLORS.BACKGROUND_LIGHT,
  },
});

