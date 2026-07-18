import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { s, vs } from "../../utils/scaling";
import { ms } from "react-native-size-matters";

export const styles = StyleSheet.create({
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

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vs(100),
  },

  emptyStateText: {
    color: COLORS.COLOR_TEXT_PRIMARY,
    fontSize: ms(16),
    opacity: 0.6,
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

  sendButtonDisabled: {
    opacity: 0.4,
  },

  sendText: {
    color: COLORS.ICON_ACTIVE,
    fontSize: ms(16),
    fontWeight: '700',
  },
});