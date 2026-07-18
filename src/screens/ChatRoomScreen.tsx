import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation';
import { ROUTES } from '../constants/routes';
import { sendMessage, subscribeToMessages } from '../services/chatService';
import { auth } from '../config/firebase';
import { COLORS } from '../constants/colors';
import { ms, s, vs } from '../utils/scaling';
type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTES.CHAT_ROOM_SCR
>;
type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: number;
};
const ChatRoomScreen = ({route,navigation}:Props) => {
    const { matchId, user} = route.params
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const flatListRef =
  useRef<FlatList<Message>>(null);

    useEffect(() => {
  const unsubscribe = subscribeToMessages(
    matchId,
    setMessages,
  );

  return unsubscribe;
}, [matchId]);

const handleSendMessage = async () => {
  if (!message.trim()) {
    return;
  }

  try {
    await sendMessage(matchId, message);

    setMessage('');
  } catch (error) {
    console.log(error);
  }
};
 return (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>
          ←
        </Text>
      </TouchableOpacity>

      <Image
        source={{
          uri: user.profileImage ,
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>
        {user.name}
      </Text>
    </View>

    <FlatList
    ref={flatListRef}
      data={messages}
      keyExtractor={item => item.id}
      contentContainerStyle={
        styles.messagesContainer
      }
      renderItem={({ item }) => {
        const isMine =
  item.senderId === auth.currentUser?.uid;

        return (
          <View
            style={[
              styles.messageBubble,
              isMine
                ? styles.myMessage
                : styles.otherMessage,
            ]}>
            <Text
              style={
                styles.messageText
              }>
              {item.text}
            </Text>
          </View>
        );
      }}
    />

    <View style={styles.inputContainer}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleSendMessage}
        style={styles.sendButton}>
        <Text
          style={styles.sendText}>
          Send
        </Text>
      </TouchableOpacity>
    </View>

  </View>
);
}

export default ChatRoomScreen



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  header: {
    height: vs(72),
    paddingHorizontal: s(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_SEPARATOR,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  backButton: {
    fontSize: ms(28),
    color: COLORS.COLOR_TEXT_PRIMARY,
    marginRight: s(12),
  },

  avatar: {
    width: s(46),
    height: s(46),
    borderRadius: s(23),
  },

  name: {
    marginLeft: s(12),
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.COLOR_TEXT_PRIMARY,
  },

  messagesContainer: {
    paddingHorizontal: s(16),
    paddingVertical: vs(16),
    flexGrow: 1,
  },

  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: s(14),
    paddingVertical: vs(12),
    borderRadius: ms(18),
    marginBottom: vs(10),
  },

  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.COLOR_CHAT_MY_MESSAGE,
    borderBottomRightRadius: ms(6),
  },

  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.COLOR_CHAT_OTHER_MESSAGE,
    borderBottomLeftRadius: ms(6),
  },

  messageText: {
    fontSize: ms(15),
    lineHeight: ms(22),
    color: COLORS.COLOR_TEXT_PRIMARY,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(12),
    paddingVertical: vs(10),
    borderTopWidth: 1,
    borderTopColor: COLORS.COLOR_SEPARATOR,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  input: {
    flex: 1,
    minHeight: vs(48),
    maxHeight: vs(120),
    backgroundColor: COLORS.COLOR_INPUT_BG,
    borderRadius: ms(24),
    paddingHorizontal: s(16),
    fontSize: ms(15),
    color: COLORS.COLOR_TEXT_PRIMARY,
  },

  sendButton: {
    marginLeft: s(12),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(8),
  },

  sendText: {
    color: COLORS.ICON_ACTIVE,
    fontSize: ms(16),
    fontWeight: '700',
  },
});