import { toaster } from '../utils/toaster';

export const uploadImageFromUrl = async (uri: string) => {
  const data = new FormData();

  data.append('file', {
    uri,
    type: 'image/jpeg',
    name: 'profile.jpg',
  });

  data.append('upload_preset', 'tinder_clone');

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dp64jxn0h/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error?.message ||
          'Failed to upload image',
      );
    }

    toaster.success(
      'Upload successful',
      'Your image has been uploaded.',
    );

    return result.secure_url;
  } catch (error: any) {
    console.error(error);

    toaster.error(
      'Upload failed',
      error.message || 'Something went wrong.',
    );

    throw error;
  }
};