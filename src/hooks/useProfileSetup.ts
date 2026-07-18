// hooks/useProfileSetup.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { saveProfile } from '../services/userService';
import { DUMMY_IMAGE } from '../constants/profile';

export const useProfileSetup = (onSuccess: () => void) => {
  const [city, setCity] = useState('');
  const [saving, setSaving] = useState(false);

  const isProfileValid = (image: string) =>
    image !== DUMMY_IMAGE && city.trim().length > 0;

  const handleNext = async (image: string) => {
    if (saving) return;

    if (image === DUMMY_IMAGE) {
      Alert.alert('Add a photo', 'Please add a profile photo to continue.');
      return;
    }

    if (!city.trim()) {
      Alert.alert('Add your city', 'Please enter your city to continue.');
      return;
    }

    setSaving(true);
    try {
      await saveProfile(image, city.trim());
      onSuccess();
    } catch (error) {
      console.log('Error saving profile:', error);
      Alert.alert(
        'Something went wrong',
        "We couldn't save your profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return { city, setCity, saving, handleNext, isProfileValid, DUMMY_IMAGE };
};
