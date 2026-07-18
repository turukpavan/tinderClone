import React, { useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ROUTES } from '../../constants/routes';
import { useMatches, MatchItem } from '../../hooks/useMatches';
import { styles } from './styles';
import Loader from '../../components/Loader';

type RootStackParamList = {
  [ROUTES.CHAT_ROOM_SCR]: { matchId: string; user: MatchItem['user'] };
};
type Props = NativeStackScreenProps<RootStackParamList, any>;

const ChatItem = React.memo(
  ({ item, onPress }: { item: MatchItem; onPress: () => void }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.user.name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.lastMessage || 'Start chatting'}
        </Text>
      </View>
    </TouchableOpacity>
  ),
);
ChatItem.displayName = 'ChatItem';

const ChatListScreen = ({ navigation }: Props) => {
  const { matches, loading, refreshing, loadMatches } = useMatches();

  useFocusEffect(
    useCallback(() => {
      loadMatches(matches.length === 0);
    }, [loadMatches, matches.length]),
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No matches yet</Text>
        <Text style={styles.emptySubtitle}>
          Start swiping and make new connections ❤️
        </Text>
      </View>
    ),
    [],
  );

  const handlePressItem = useCallback(
    (item: MatchItem) => {
      navigation.navigate(ROUTES.CHAT_ROOM_SCR, {
        matchId: item.id,
        user: item.user,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: MatchItem }) => (
      <ChatItem item={item} onPress={() => handlePressItem(item)} />
    ),
    [handlePressItem],
  );

  if (loading && matches.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Loader/>
        <Text style={styles.loadingText}>Loading matches...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>

      <FlatList
        data={matches}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        renderItem={renderItem}
        // 3. Support pull-to-refresh natively
        refreshing={refreshing}
        onRefresh={loadMatches}
      />
    </View>
  );
};

export default ChatListScreen;
