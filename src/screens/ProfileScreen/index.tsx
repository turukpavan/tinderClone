import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'; // Import Firebase Auth

import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { BottomTabParamList, RootStackParamList } from '../../navigation/navigation';
import { useProfile } from '../../hooks/useProfile';
import { styles } from './styles';
import Loader from '../../components/Loader';
import Icon from '../../components/Icon'; // Reusable Icon component

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, typeof ROUTES.PROFILE_SCR>,
  NativeStackScreenProps<RootStackParamList>
>;

const ProfileScreen = ({ navigation }: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { user, loading, loadUser } = useProfile();

  // Load profile when screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadUser(user.id === '');
    }, [loadUser, user.id]),
  );

  const handleEditProfile = useCallback(() => {
    navigation.navigate(ROUTES.UPDATEPROFILE_SCR);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await auth().signOut();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to log out. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  }, []);

  if (loading && user.id === '') {
    return (
      <View style={[styles.loader, { backgroundColor: isDarkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND_LIGHT }]}>
        <Loader size="large" color={COLORS.BACKGROUND_RED} />
      </View>
    );
  }

  const activeTextColor = isDarkMode ? COLORS.COLOR_WHITE : COLORS.COLOR_TEXT_PRIMARY;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDarkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND_LIGHT }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerCover} />

      {/* Profile Card Info Box */}
      <View style={[styles.profileCard, isDarkMode && styles.darkCard]}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: user.profileImage || 'https://via.placeholder.com/200',
            }}
            style={styles.profileImage}
          />
        </View>

        <Text style={[styles.name, { color: activeTextColor }]}>
          {user.name || 'Anonymous'}
        </Text>

        <View style={styles.locationContainer}>
          <Icon name="MapPin" size={16} color={COLORS.BACKGROUND_RED} />
          <Text style={styles.city}>{user.city || 'Unknown Location'}</Text>
        </View>

        <View style={[styles.bioContainer, isDarkMode && styles.darkBioContainer]}>
          <Text style={styles.bio}>
            {user.caption || 'No bio or caption added yet.'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTextColor }]}>Interests</Text>
        <View style={styles.interestsContainer}>
          {user.interests.length > 0 ? (
            user.interests.map(item => (
              <View key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No interests added</Text>
          )}
        </View>
      </View>

      <View style={[styles.menuContainer, isDarkMode && styles.darkMenuContainer]}>
        <TouchableOpacity onPress={handleEditProfile} style={styles.menuRow}>
          <View style={styles.menuRowLeft}>
            <View style={[styles.iconBg, { backgroundColor: '#E1F5FE' }]}>
              <Icon name="User" size={20} color="#03A9F4" />
            </View>
            <Text style={[styles.menuText, { color: activeTextColor }]}>Edit Profile</Text>
          </View>
          <Icon name="ChevronRight" size={20} color={COLORS.COLOR_TEXT_SECONDARY} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <View style={styles.menuRowLeft}>
            <View style={[styles.iconBg, { backgroundColor: '#EDE7F6' }]}>
              <Icon name="Settings" size={20} color="#673AB7" />
            </View>
            <Text style={[styles.menuText, { color: activeTextColor }]}>Settings</Text>
          </View>
          <Icon name="ChevronRight" size={20} color={COLORS.COLOR_TEXT_SECONDARY} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={[styles.menuRow, styles.lastMenuRow]}>
          <View style={styles.menuRowLeft}>
            <View style={[styles.iconBg, { backgroundColor: '#FFEBEE' }]}>
              <Icon name="LogOut" size={20} color={COLORS.BACKGROUND_RED} />
            </View>
            <Text style={[styles.menuText, { color: COLORS.BACKGROUND_RED, fontWeight: '700' }]}>Logout</Text>
          </View>
          <Icon name="ChevronRight" size={20} color={COLORS.BACKGROUND_RED} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;