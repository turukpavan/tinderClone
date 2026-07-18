import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { ROUTES } from '../constants/routes';
import { getMatches } from '../services/chatService';
import { COLORS } from '../constants/colors';
import { s, vs, ms } from '../utils/scaling';

const ChatListScreen = ({ navigation }: any) => {
    
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 useFocusEffect(
  useCallback(() => {
    loadMatches();
  }, []),
);
const renderEmptyComponent = useCallback(() => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        No matches yet
      </Text>

      <Text style={styles.emptySubtitle}>
        Start swiping and make new connections ❤️
      </Text>
    </View>
  );
}, []);

 const loadMatches = async () => {
  try {
    setLoading(true);

    const data = await getMatches();

    setMatches(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

if (loading) {
  return (
    <View style={styles.loaderContainer}>

      <ActivityIndicator
        size="large"
        color={COLORS.BACKGROUND_RED}
      />

      <Text style={styles.loadingText}>
        Loading matches...
      </Text>
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate(
                ROUTES.CHAT_ROOM_SCR,
                {
                  matchId: item.id,
                  user : item.user
                },
              )
            }>
            <Image
              source={{
                uri: item.user.profileImage,
              }}
              style={styles.avatar}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {item.user.name}
              </Text>

              <Text
                style={styles.message}
                numberOfLines={1}>
                {item.lastMessage ||
                  'Start chatting'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatListScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  header: {
    fontSize: ms(28),
    fontWeight: '700',
    color: COLORS.BACKGROUND_RED,
    paddingHorizontal: s(20),
    paddingTop: vs(10),
    paddingBottom: vs(20),
  },

  listContent: {
    paddingHorizontal: s(16),
    paddingBottom: vs(20),
    flexGrow: 1,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.COLOR_CARD,
    paddingVertical: vs(14),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_SEPARATOR,
  },

  avatar: {
    width: s(64),
    height: s(64),
    borderRadius: s(32),
  },

  textContainer: {
    flex: 1,
    marginLeft: s(14),
    justifyContent: 'center',
  },

  name: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.COLOR_TEXT_PRIMARY,
  },

  message: {
    marginTop: vs(4),
    fontSize: ms(15),
    color: COLORS.COLOR_TEXT_SECONDARY,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  loadingText: {
    marginTop: vs(12),
    fontSize: ms(16),
    color: COLORS.COLOR_TEXT_SECONDARY,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(32),
  },

  emptyTitle: {
    fontSize: ms(24),
    fontWeight: '700',
    color: COLORS.COLOR_TEXT_PRIMARY,
  },

  emptySubtitle: {
    marginTop: vs(10),
    fontSize: ms(16),
    lineHeight: ms(24),
    textAlign: 'center',
    color: COLORS.COLOR_TEXT_SECONDARY,
  },
});