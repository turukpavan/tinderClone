// hooks/useStackUsers.ts
import { useState, useCallback } from 'react';
import {
  getAllStackUsers,
  saveSwipe,
  createMatchIfExists,
} from '../services/userService';

export type User = {
  id: string;
  profileImage: string;
  city: string;
  name: string;
  caption: string;
};

export const useStackUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllStackUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch profiles. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSwipeRight = useCallback(
    async (cardIndex: number) => {
      const likedUser = users[cardIndex];
      if (!likedUser) return;

      try {
        await saveSwipe(likedUser.id, 'likes');
        const isMatch = await createMatchIfExists(likedUser.id);
        if (isMatch) {
          console.log('🎉 Match!');
        }
      } catch (err) {
        console.error('Failed to swipe right:', err);
      }
    },
    [users],
  );

  const handleSwipeLeft = useCallback(
    async (cardIndex: number) => {
      const passedUser = users[cardIndex];
      if (!passedUser) return;

      try {
        await saveSwipe(passedUser.id, 'passes');
      } catch (err) {
        console.error('Failed to swipe left:', err);
      }
    },
    [users],
  );

  return {
    users,
    loading,
    error,
    fetchUsers,
    handleSwipeRight,
    handleSwipeLeft,
  };
};
