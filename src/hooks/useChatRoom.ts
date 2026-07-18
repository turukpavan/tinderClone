// hooks/useChatRoom.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { sendMessage, subscribeToMessages } from '../services/chatService';

type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: number;
};

export const useChatRoom = (matchId: string) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const unsubscribe = subscribeToMessages(matchId, setMessages);
    return unsubscribe;
  }, [matchId]);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  const handleSendMessage = useCallback(async () => {
    const trimmed = message.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      await sendMessage(matchId, trimmed);
      setMessage('');
    } catch (error) {
      console.log('sendMessage error', error);
    } finally {
      setSending(false);
    }
  }, [message, matchId, sending]);

  return {
    message,
    setMessage,
    messages,
    sending,
    flatListRef,
    handleSendMessage,
  };
};
