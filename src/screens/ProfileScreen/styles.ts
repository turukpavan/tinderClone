import { StyleSheet } from 'react-native';
import { s, vs, ms } from '../../utils/scaling';
import { COLORS } from '../../constants/colors';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingBottom: vs(40),
  },
  headerCover: {
    height: vs(140),
    backgroundColor: COLORS.BACKGROUND_RED,
    borderBottomLeftRadius: ms(40),
    borderBottomRightRadius: ms(40),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  profileCard: {
    backgroundColor: COLORS.COLOR_WHITE,
    borderRadius: ms(24),
    marginTop: vs(60),
    marginHorizontal: s(20),
    paddingVertical: vs(24),
    paddingHorizontal: s(16),
    alignItems: 'center',
    // Card Shadow styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  avatarWrapper: {
    borderWidth: 4,
    borderColor: COLORS.COLOR_WHITE,
    borderRadius: ms(70),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginTop: vs(-70),
  },
  profileImage: {
    width: s(120),
    height: s(120),
    borderRadius: ms(60),
  },
  name: {
    fontSize: ms(24),
    fontWeight: '800',
    marginTop: vs(12),
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(6),
  },
  city: {
    fontSize: ms(15),
    fontWeight: '600',
    color: COLORS.COLOR_TEXT_SECONDARY,
    marginLeft: s(4),
  },
  bioContainer: {
    backgroundColor: '#F5F7FA',
    borderRadius: ms(16),
    paddingHorizontal: s(16),
    paddingVertical: vs(12),
    marginTop: vs(16),
    width: '100%',
  },
  darkBioContainer: {
    backgroundColor: '#2A2A2A',
  },
  bio: {
    fontSize: ms(14),
    lineHeight: vs(20),
    color: COLORS.COLOR_TEXT_MUTED,
    textAlign: 'center',
  },
  section: {
    marginTop: vs(28),
    paddingHorizontal: s(24),
  },
  sectionTitle: {
    fontSize: ms(18),
    fontWeight: '800',
    marginBottom: vs(12),
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(8),
  },
  chip: {
    backgroundColor: '#FFEBEF',
    paddingHorizontal: s(14),
    paddingVertical: vs(8),
    borderRadius: ms(20),
  },
  chipText: {
    color: COLORS.BACKGROUND_RED,
    fontSize: ms(13),
    fontWeight: '700',
  },
  emptyText: {
    color: COLORS.COLOR_TEXT_SECONDARY,
    fontSize: ms(14),
    fontStyle: 'italic',
  },
  menuContainer: {
    backgroundColor: COLORS.COLOR_WHITE,
    borderRadius: ms(20),
    marginHorizontal: s(20),
    marginTop: vs(28),
    paddingHorizontal: s(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  darkMenuContainer: {
    backgroundColor: '#1E1E1E',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastMenuRow: {
    borderBottomWidth: 0,
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: s(36),
    height: s(36),
    borderRadius: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(14),
  },
  menuText: {
    fontSize: ms(16),
    fontWeight: '600',
  },
});