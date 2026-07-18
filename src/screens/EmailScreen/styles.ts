import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { s, vs, ms } from "../../utils/scaling";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK,
  },

  flex: {
    flex: 1,
  },

  backButton: {
    marginTop: vs(12),
    marginLeft: s(20),
    width: ms(40),
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },

  backArrow: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(26),
  },

  content: {
    flex: 1,
    paddingHorizontal: s(24),
    marginTop: vs(24),
  },

  title: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(40),
    fontWeight: '700',
    lineHeight: vs(46),
    marginBottom: vs(40),
  },

  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_BORDER,
    paddingBottom: vs(10),
    marginBottom: vs(24),
  },

  emailInput: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(20),
    padding: 0,
  },

  nextButton: {
    backgroundColor: COLORS.BACKGROUND_NXTBTN,
    borderRadius: ms(30),
    marginHorizontal: s(24),
    marginBottom: vs(32),
    paddingVertical: vs(18),
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextButtonText: {
    color: COLORS.COLOR_NXTBTN,
    fontSize: ms(18),
    fontWeight: '600',
  },
});