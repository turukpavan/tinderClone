import { StyleSheet } from "react-native";
import { ms, s, vs } from "../../utils/scaling";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    padding: s(20),
    paddingBottom: vs(40),
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  loaderContainer: {
    backgroundColor : COLORS.BACKGROUND_LIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: vs(24),
  },

  image: {
    width: s(150),
    height: s(150),
    borderRadius: s(75),
    borderWidth: 2,
    borderColor: COLORS.ICON_ACTIVE,
  },

  changePhotoText: {
    marginTop: vs(12),
    fontSize: ms(16),
    fontWeight: '600',
    color: COLORS.ICON_ACTIVE,
  },

  label: {
    fontSize: ms(16),
    fontWeight: '600',
    marginBottom: vs(8),
    marginTop: vs(18),
    color: COLORS.COLOR_DARK,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.COLOR_BORDER,
    borderRadius: ms(12),
    paddingHorizontal: s(14),
    paddingVertical: vs(14),
    fontSize: ms(16),
    color: COLORS.COLOR_DARK,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

 imageSpinner: { position: 'absolute', top: '40%' },
 buttonDisabled: { opacity: 0.5 },

  multiline: {
    minHeight: vs(100),
    textAlignVertical: 'top',
  },

  button: {
    marginTop: vs(30),
    backgroundColor: COLORS.BACKGROUND_RED,
    paddingVertical: vs(16),
    borderRadius: ms(12),
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.COLOR_LIGHT,
    fontSize: ms(16),
    fontWeight: '700',
  },
});