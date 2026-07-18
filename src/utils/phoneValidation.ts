// utils/phoneValidation.ts
export const MAX_PHONE_LENGTH = 10;
export const COUNTRY_CODE = '+91';

export const sanitizePhoneInput = (text: string): string =>
  text.replace(/\D/g, '').slice(0, MAX_PHONE_LENGTH);

export const isValidPhoneNumber = (phoneNumber: string): boolean =>
  phoneNumber.length === MAX_PHONE_LENGTH;

export const toFullPhoneNumber = (phoneNumber: string): string =>
  `${COUNTRY_CODE}${phoneNumber}`;