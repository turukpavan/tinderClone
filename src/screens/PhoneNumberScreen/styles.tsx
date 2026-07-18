import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { ms, s, vs } from '../../utils/scaling';

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
    width: s(40),
    height: vs(40),
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
    fontSize: ms(35),
    fontWeight: '700',
    lineHeight: vs(46),
    marginBottom: vs(40),
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: vs(32),
  },

  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_BORDER,
    paddingBottom: vs(10),
    marginRight: s(16),
  },

  countryCodeText: {
    color: COLORS.COLOR_SECONDARY_TEXT,
    fontSize: ms(20),
    marginRight: s(4),
  },

  chevron: {
    color: COLORS.COLOR_SECONDARY_TEXT,
    fontSize: ms(14),
    marginBottom: vs(2),
  },

  phoneInputWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_LIGHT,
    paddingBottom: vs(10),
  },

  phoneInput: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(20),
    padding: 0,
  },

  disclaimer: {
    color: COLORS.COLOR_PLACEHOLDER,
    fontSize: ms(15),
    lineHeight: vs(22),
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
