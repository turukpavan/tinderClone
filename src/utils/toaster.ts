import Toast from 'react-native-toast-message';

type ToasterType = 'success' | 'error' | 'info';

const show = (
  type: ToasterType,
  text1: string,
  text2?: string,
) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
  });
};

export const toaster = {
  success: (title: string, message?: string) =>
    show('success', title, message),

  error: (title: string, message?: string) =>
    show('error', title, message),

  info: (title: string, message?: string) =>
    show('info', title, message),
};