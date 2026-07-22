// hooks/useStackUsers.ts
import { useCallback, useState } from 'react';
import {
  createMatchIfExists,
  getAllStackUsers,
  saveSwipe,
} from '../services/userService';
import { toaster } from '../utils/toaster';

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
    } catch {
      const message = 'Failed to fetch profiles. Please try again.';

      setError(message);
      toaster.error('Error', message);
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
          toaster.success(
            "It's a match! 🎉",
            `You matched with ${likedUser.name}`,
          );
        }
      } catch {
        toaster.error(
          'Swipe failed',
          'Unable to save your like. Please try again.',
        );
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
      } catch {
        toaster.error(
          'Swipe failed',
          'Unable to save your action. Please try again.',
        );
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