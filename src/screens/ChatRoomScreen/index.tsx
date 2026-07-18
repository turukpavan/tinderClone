import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/navigation';
import { ROUTES } from '../../constants/routes';
import { auth } from '../../config/firebase';
import { useChatRoom } from '../../hooks/useChatRoom';
import MessageBubble from '../../components/MessageBubble';
import { DUMMY_IMAGE } from '../../constants/profile';
import { styles } from './styles';
import { vs } from '../../utils/scaling';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.CHAT_ROOM_SCR>;

const MAX_MESSAGE_LENGTH = 1000;

const ChatRoomScreen = ({ route, navigation }: Props) => {
  const { matchId, user } = route.params;
  const { message, setMessage, messages, sending, flatListRef, handleSendMessage } =
    useChatRoom(matchId);

  const renderItem = useCallback(
    ({ item }: { item: (typeof messages)[number] }) => (
      <MessageBubble text={item.text} isMine={item.senderId === auth.currentUser?.uid} />
    ),
    [],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? vs(88) : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>

        <Image source={{ uri: user.profileImage || DUMMY_IMAGE }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Say hi to {user.name}!</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
          maxLength={MAX_MESSAGE_LENGTH}
          multiline
          editable={!sending}
        />

        <TouchableOpacity
          onPress={handleSendMessage}
          style={[styles.sendButton, (!message.trim() || sending) && styles.sendButtonDisabled]}
          disabled={!message.trim() || sending}
        >
          <Text style={styles.sendText}>{sending ? '...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;

