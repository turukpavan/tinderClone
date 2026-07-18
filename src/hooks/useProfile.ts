// hooks/useProfile.ts
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { getCurrentUserDoc } from '../services/userService';

export interface UserProfile {
  id: string;
  name: string;
  city: string;
  profileImage: string;
  caption: string;
  interests: string[];
}

export const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile>({
    id: '',
    name: '',
    city: '',
    profileImage: '',
    caption: '',
    interests: [],
  });

  const loadUser = useCallback(async (showFullLoader = false) => {
    if (showFullLoader) {
      setLoading(true);
    }

    try {
      const userDoc = await getCurrentUserDoc();

      if (userDoc?.exists()) {
        const data = userDoc.data();
        setUser({
          id: data.id ?? '',
          name: data.name ?? '',
          city: data.city ?? '',
          profileImage: data.profileImage ?? '',
          caption: data.caption ?? '',
          interests: data.interests ?? [],
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    loadUser,
  };
};
