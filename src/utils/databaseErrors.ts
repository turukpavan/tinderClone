type FirebaseErrorLike = {
  code?: string;
};

const ERROR_MESSAGES: Record<string, string> = {
  'permission-denied':
    'You do not have permission to perform this action.',

  unavailable:
    'Service is temporarily unavailable.',

  'network-request-failed':
    'Please check your internet connection.',
};

export const getDatabaseErrorMessage = (
  error: unknown,
) => {
  const err = error as FirebaseErrorLike;

  return (
    ERROR_MESSAGES[err?.code ?? ''] ??
    'Something went wrong.'
  );
};