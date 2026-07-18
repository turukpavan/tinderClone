// components/MessageBubble.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { ms, s, vs } from '../utils/scaling';

type Props = {
  text: string;
  isMine: boolean;
};

const MessageBubble = ({ text, isMine }: Props) => (
  <View
    style={[styles.bubble, isMine ? styles.myMessage : styles.otherMessage]}
  >
    <Text style={styles.messageText}>{text}</Text>
  </View>
);

export default React.memo(MessageBubble);

const styles = StyleSheet.create({
  bubble: {
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
});
