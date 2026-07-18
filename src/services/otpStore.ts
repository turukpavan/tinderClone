// services/otpStore.ts
import { sendOtp } from './authService';

type ConfirmationResult = Awaited<ReturnType<typeof sendOtp>>;

let confirmationResult: ConfirmationResult | null = null;

export const otpStore = {
  set: (confirmation: ConfirmationResult) => {
    confirmationResult = confirmation;
  },
  get: () => confirmationResult,
  clear: () => {
    confirmationResult = null;
  },
};