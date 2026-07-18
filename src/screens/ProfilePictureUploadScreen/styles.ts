import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { ms, s, vs } from "../../utils/scaling";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK,
    alignItems: 'center',
    paddingHorizontal: s(24),
    paddingTop: vs(60),
  },

  title: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(30),
    fontWeight: '700',
    marginBottom: vs(40),
  },

  imageContainer: {
    width: s(220),
    height: s(220),
    borderRadius: ms(110),
    overflow: 'hidden',
    borderWidth: ms(3),
    borderColor: COLORS.ICON_ACTIVE,
    marginBottom: vs(24),
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  inputContainer: {
    width: '100%',
    marginBottom: vs(20),
  },

  input: {
    width: '100%',
    backgroundColor: '#1F1F1F',

    color: COLORS.COLOR_LIGHT,

    borderRadius: ms(14),

    paddingHorizontal: s(16),

    paddingVertical: vs(14),

    fontSize: ms(16),

    borderWidth: 1,

    borderColor: COLORS.ICON_ACTIVE,
  },

  button: {
    width: '100%',

    backgroundColor: COLORS.BACKGROUND_NXTBTN,

    paddingVertical: vs(16),

    borderRadius: ms(30),

    alignItems: 'center',

    marginBottom: vs(16),
  },

  buttonText: {
    color: COLORS.COLOR_LIGHT,

    fontSize: ms(16),

    fontWeight: '600',
  },

  nextButton: {
    position: 'absolute',

    bottom: vs(30),

    left: s(24),

    right: s(24),

    backgroundColor: COLORS.ICON_ACTIVE,

    paddingVertical: vs(16),

    borderRadius: ms(30),

    alignItems: 'center',
  },

  nextButtonText: {
    color: COLORS.COLOR_LIGHT,

    fontSize: ms(18),

    fontWeight: '700',
  },
  buttonDisabled: { opacity: 0.5 },
 uploadingOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },});