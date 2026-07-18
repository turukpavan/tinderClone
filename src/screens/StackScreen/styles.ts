import { StatusBar, StyleSheet } from "react-native";
import { ms, s, vs } from "../../utils/scaling";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: vs(80),
    justifyContent: 'center',
    paddingHorizontal: s(20),
    paddingTop: StatusBar.currentHeight || 0,
  },
  heroTxt: {
    color: COLORS.BACKGROUND_RED,
    fontSize: ms(24),
    fontWeight: '900',
  },
  swiperContainer: {
    flex: 1,
    paddingHorizontal: s(12),
    paddingBottom: vs(20),
  },
  card: {
    borderRadius: ms(24),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: COLORS.CARD_OVERLAY,
  },
  infoContainer: {
    position: 'absolute',
    left: s(20),
    right: s(20),
    bottom: vs(24),
  },
  name: {
    color: COLORS.COLOR_WHITE,
    fontSize: ms(30),
    fontWeight: '700',
    marginBottom: vs(4),
  },
  city: {
    color: COLORS.COLOR_WHITE,
    fontSize: ms(18),
    fontWeight: '500',
    marginBottom: vs(8),
  },
  caption: {
    color: COLORS.COLOR_WHITE,
    fontSize: ms(16),
    lineHeight: vs(22),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(24),
  },
  emptyTitle: {
    fontSize: ms(24),
    fontWeight: '700',
    color: COLORS.COLOR_DARK,
  },
  emptySubtitle: {
    marginTop: vs(10),
    color: COLORS.COLOR_TEXT_TERTIARY,
    fontSize: ms(16),
    textAlign: 'center',
    lineHeight: vs(24),
  },
});