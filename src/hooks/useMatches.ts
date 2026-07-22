import { useState, useCallback } from 'react';
import { getMatches } from '../services/chatService';
import { getDatabaseErrorMessage } from '../utils/databaseErrors';
import { toaster } from '../utils/toaster';

export interface MatchUser {
  profileImage: string;
  name: string;
}

export interface MatchItem {
  id: string;
  user: MatchUser;
  lastMessage?: string;
}

export const useMatches = () => {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMatches = useCallback(
    async (showFullLoader = false) => {
      if (showFullLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      try {
        const rawData = await getMatches();

        const formattedMatches: MatchItem[] = (rawData || [])
          .filter(
            (
              item,
            ): item is typeof item & {
              user: Exclude<typeof item.user, undefined>;
            } => {
              return (
                item !== null &&
                item !== undefined &&
                item.user !== undefined
              );
            },
          )
          .map(item => {
            const rawItem = item as any;

            return {
              id: rawItem.id,
              lastMessage: rawItem.lastMessage,
              user: {
                name: rawItem.user.name || 'Unknown User',
                profileImage:
                  rawItem.user.profileImage ||
                  'https://via.placeholder.com/150',
              },
            };
          });

        setMatches(formattedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);

        toaster.error(
          'Failed to load matches',
          getDatabaseErrorMessage(error),
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  return {
    matches,
    loading,
    refreshing,
    loadMatches,
  };
};