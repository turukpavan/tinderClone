import { useEffect, useState } from 'react';
import { sendOtp } from '../services/authService';
import { getCurrentUserDoc } from '../services/userService';
import { otpStore } from '../services/otpStore';
import { runWithAuthHandling } from '../utils/runWithAuthHandling';
import { getAuthErrorMessage } from '../utils/authErrors';
import { toaster } from '../utils/toaster';

const RESEND_COOLDOWN_SECONDS = 30;

export const useOtpVerification = (
  phoneNumber: string,
  onVerified: (isNewUser: boolean) => void,
  onSessionExpired: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown === 0) return;

    const timer = setInterval(() => {
      setResendCooldown(prev =>
        prev <= 1 ? 0 : prev - 1,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (code: string) => {
    const confirmation = otpStore.get();

    if (!confirmation) {
      toaster.error(
        'Session expired',
        'Please request a new code.',
      );

      onSessionExpired();
      return;
    }

    setLoading(true);

    try {
      await confirmation.confirm(code);

      otpStore.clear();
    } catch (error) {
      toaster.error(
        'Invalid code',
        getAuthErrorMessage(error),
      );

      setLoading(false);
      return;
    }

    try {
      const userDoc = await getCurrentUserDoc();

      onVerified(userDoc.exists());
    } catch {
      toaster.error(
        'Something went wrong',
        "Your code was verified, but we couldn't load your profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resending || resendCooldown > 0) {
      return;
    }

    const result = await runWithAuthHandling(
      () => sendOtp(phoneNumber),
      {
        setLoading: setResending,
        errorTitle: "Couldn't resend",
      },
    );

    if (!result.success) {
      return;
    }

    otpStore.set(result.data);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);

    toaster.success(
      'OTP sent',
      'A new verification code has been sent.',
    );
  };

  return {
    loading,
    resending,
    resendCooldown,
    handleSubmit,
    handleResend,
  };
};