// utils/emailValidation.ts
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 6;

export const isValidEmail = (email: string): boolean =>
  EMAIL_REGEX.test(email.trim());

export const isValidPassword = (password: string): boolean =>
  password.length >= MIN_PASSWORD_LENGTH;

export const isEmailFormValid = (email: string, password: string): boolean =>
  isValidEmail(email) && isValidPassword(password);