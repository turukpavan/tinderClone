import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { ms, s, vs } from "../../utils/scaling";

export const styles = StyleSheet.create({
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