import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { ms, s, vs } from "../../utils/scaling";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingVertical: vs(30),
    paddingHorizontal: s(20),
  },
  profileImage: {
    width: s(180),
    height: s(180),
    borderRadius: ms(90),
    alignSelf: 'center',
  },
  name: {
    marginTop: vs(20),
    textAlign: 'center',
    fontSize: ms(30),
    fontWeight: '700',
    color: COLORS.COLOR_TEXT_PRIMARY,
  },
  city: {
    marginTop: vs(8),
    textAlign: 'center',
    fontSize: ms(18),
    color: COLORS.COLOR_TEXT_SECONDARY,
  },
  bio: {
    marginTop: vs(16),
    textAlign: 'center',
    fontSize: ms(16),
    lineHeight: vs(24),
    color: COLORS.COLOR_TEXT_MUTED,
    paddingHorizontal: s(10),
  },
  section: {
    marginTop: vs(32),
    paddingHorizontal: s(20),
  },
  sectionTitle: {
    fontSize: ms(22),
    fontWeight: '700',
    marginBottom: vs(16),
    color: COLORS.COLOR_TEXT_PRIMARY,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(10),
  },
  chip: {
    backgroundColor: COLORS.PROFILE_CHIP_BACKGROUND,
    paddingHorizontal: s(18),
    paddingVertical: vs(10),
    borderRadius: ms(20),
  },
  chipText: {
    color: COLORS.BACKGROUND_RED,
    fontSize: ms(14),
    fontWeight: '600',
  },
  emptyText: {
    color: COLORS.COLOR_TEXT_SECONDARY,
    fontSize: ms(14),
  },
  button: {
    backgroundColor: COLORS.PROFILE_BUTTON_BACKGROUND,
    paddingVertical: vs(16),
    borderRadius: ms(16),
    alignItems: 'center',
    marginBottom: vs(14),
  },
  buttonText: {
    fontSize: ms(16),
    fontWeight: '600',
    color: COLORS.COLOR_TEXT_PRIMARY,
  },
  logoutButton: {
    backgroundColor: COLORS.PROFILE_CHIP_BACKGROUND,
  },
  logoutText: {
    color: COLORS.BACKGROUND_RED,
    fontSize: ms(16),
    fontWeight: '700',
  },
});