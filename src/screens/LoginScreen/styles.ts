import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import {ms, s, vs } from "../../utils/scaling";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_RED,
    padding: s(20),
  },
  section1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinder: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(55),
    fontWeight: '900',
  },
  section2: {
    flex: 1,
  },
  policyTxt: {
    color: COLORS.COLOR_LIGHT,
    textAlign: 'center',
    fontSize: ms(14),
    fontWeight: '400',
    paddingBottom: vs(20),
    lineHeight: vs(22),
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  loginWithContainer: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    marginBottom: vs(10),
    paddingVertical: vs(15),
    paddingHorizontal: s(18),
    borderRadius: ms(35),
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
  },
  buttonText: {
    color: COLORS.COLOR_DARK,
    fontSize: ms(14),
    fontWeight: '600',
  },
});