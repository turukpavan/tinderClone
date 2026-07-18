// utils/authErrors.ts

type FirebaseErrorLike = {
  code?: string;
  message?: string;
};

const ERROR_MESSAGES: Record<string, string> = {
  'auth/too-many-requests': 'Too many attempts. Please wait a while before trying again.',
  'auth/invalid-phone-number': 'That doesn\'t look like a valid phone number.',
  'auth/network-request-failed': 'No internet connection. Please check your network.',
  'auth/invalid-verification-code': 'The code you entered is incorrect.',
  'auth/code-expired': 'This code has expired. Please request a new one.',
  'auth/user-disabled': 'This account has been disabled. Contact support.',
  'auth/quota-exceeded': 'SMS limit reached for now. Please try again later.',
};

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.';

export const getAuthErrorMessage = (error: unknown): string => {
  const err = error as FirebaseErrorLike;
  if (err?.code && ERROR_MESSAGES[err.code]) {
    return ERROR_MESSAGES[err.code];
  }
  return DEFAULT_MESSAGE;
};