// screens/ProfileScreen.tsx
import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { BottomTabParamList, RootStackParamList } from '../../navigation/navigation';
import { useProfile } from '../../hooks/useProfile';
import { styles } from './styles';
import Loader from '../../components/Loader';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, typeof ROUTES.PROFILE_SCR>,
  NativeStackScreenProps<RootStackParamList>
>;

const ProfileScreen = ({ navigation }: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { user, loading, loadUser } = useProfile();


  useFocusEffect(
    useCallback(() => {
      loadUser(user.id === '');
    }, [loadUser, user.id]),
  );

  const handleEditProfile = useCallback(() => {
    navigation.navigate(ROUTES.UPDATEPROFILE_SCR);
  }, [navigation]);

  if (loading && user.id === '') {
    return (
      <View style={[styles.loader, { backgroundColor: isDarkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND_LIGHT }]}>
        <Loader size="large" color={COLORS.BACKGROUND_RED} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{
          uri: user.profileImage || 'https://via.placeholder.com/200',
        }}
        style={styles.profileImage}
      />

      <Text style={styles.name}>{user.name || 'Anonymous'}</Text>
      <Text style={styles.city}>{user.city || 'Unknown Location'}</Text>
      <Text style={styles.bio}>{user.caption || 'No caption added'}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
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

      <View style={styles.section}>
        <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

