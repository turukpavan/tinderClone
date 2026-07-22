// hooks/useProfileSetup.ts
import { useState } from 'react';
import { saveProfile } from '../services/userService';
import { DUMMY_IMAGE } from '../constants/profile';
import { toaster } from '../utils/toaster';

export const useProfileSetup = (onSuccess: () => void) => {
  const [city, setCity] = useState('');
  const [saving, setSaving] = useState(false);

  const isProfileValid = (image: string) =>
    image !== DUMMY_IMAGE && city.trim().length > 0;

  const handleNext = async (image: string) => {
    if (saving) return;

    if (image === DUMMY_IMAGE) {
      toaster.error(
        'Add a photo',
        'Please add a profile photo to continue.',
      );
      return;
    }

    if (!city.trim()) {
      toaster.error(
        'Add your city',
        'Please enter your city to continue.',
      );
      return;
    }

    setSaving(true);

    try {
      await saveProfile(image, city.trim());

      toaster.success(
        'Profile saved',
        'Your profile has been updated successfully.',
      );

      onSuccess();
    } catch {
      toaster.error(
        'Something went wrong',
        "We couldn't save your profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return {
    city,
    setCity,
    saving,
    handleNext,
    isProfileValid,
    DUMMY_IMAGE,
  };
};