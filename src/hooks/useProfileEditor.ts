// hooks/useProfileEditor.ts
import { useEffect, useState } from 'react';
import {
  getCurrentUserDoc,
  updateProfile,
} from '../services/userService';

import { toaster } from '../utils/toaster';
import { getDatabaseErrorMessage } from '../utils/databaseErrors';

export const useProfileEditor = (
  onImageLoaded: (url: string) => void,
) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [caption, setCaption] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const userDoc = await getCurrentUserDoc();

        if (!userDoc.exists()) {
          if (isMounted) {
            toaster.error(
              'Profile not found',
              "We couldn't load your profile.",
            );
          }

          return;
        }

        const data = userDoc.data();

        if (!isMounted) {
          return;
        }

        onImageLoaded(data?.profileImage || '');
        setName(data?.name || '');
        setCity(data?.city || '');
        setCaption(data?.caption || '');

        setInterests(
          Array.isArray(data?.interests)
            ? data.interests.join(', ')
            : '',
        );
      } catch (error) {
        if (isMounted) {
          toaster.error(
            'Failed to load profile',
            getDatabaseErrorMessage(error),
          );
        }
      } finally {
        if (isMounted) {
          setInitialLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [onImageLoaded]);

  const handleUpdate = async (
    profileImage: string,
  ) => {
    if (saving) {
      return;
    }

    if (!name.trim()) {
      toaster.error(
        'Missing name',
        'Please enter your name.',
      );

      return;
    }

    if (!city.trim()) {
      toaster.error(
        'Missing city',
        'Please enter your city.',
      );

      return;
    }

    setSaving(true);

    try {
      await updateProfile({
        name: name.trim(),
        profileImage,
        city: city.trim(),
        caption: caption.trim(),
        interests: interests
          .split(',')
          .map(item => item.trim())
          .filter(Boolean),
      });

      toaster.success(
        'Success',
        'Profile updated successfully',
      );
    } catch (error) {
      toaster.error(
        'Failed to update profile',
        getDatabaseErrorMessage(error),
      );
    } finally {
      setSaving(false);
    }
  };

  return {
    initialLoading,
    saving,
    name,
    setName,
    city,
    setCity,
    caption,
    setCaption,
    interests,
    setInterests,
    handleUpdate,
  };
};