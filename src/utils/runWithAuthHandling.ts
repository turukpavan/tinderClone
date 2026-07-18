// utils/runWithAuthHandling.ts
import { Alert } from 'react-native';
import { getAuthErrorMessage } from './authErrors';

type AuthResult<T> = { success: true; data: T } | { success: false };

type RunOptions = {
  setLoading?: (loading: boolean) => void;
  errorTitle?: string;
  onError?: (error: unknown) => void;
};

export const runWithAuthHandling = async <T>(
  action: () => Promise<T>,
  options: RunOptions = {},
): Promise<AuthResult<T>> => {
  const { setLoading, errorTitle = 'Error', onError } = options;

  setLoading?.(true);
  try {
    const data = await action();
    return { success: true, data };
  } catch (error) {
    console.log('[auth error]', error);
    Alert.alert(errorTitle, getAuthErrorMessage(error));
    onError?.(error);
    return { success: false };
  } finally {
    setLoading?.(false);
  }
};