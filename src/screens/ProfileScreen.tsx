import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { BottomTabParamList, RootStackParamList } from '../navigation/navigation';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native'
import { ROUTES } from '../constants/routes';
import { getCurrentUserDoc } from '../services/userService';
import { ms, s, vs } from '../utils/scaling';
import { COLORS } from '../constants/colors';
type Props = CompositeScreenProps<
  BottomTabScreenProps<
    BottomTabParamList,
    typeof ROUTES.PROFILE_SCR
  >,
  NativeStackScreenProps<RootStackParamList>
>;
type User = {
  id: string;
  name: string;
  city: string;
  profileImage: string;
  caption: string;
  interests: string[];
};

const ProfileScreen = ({navigation}:Props) => {
  const [loading, setLoading] = useState(false);
const [user, setUser] = useState<User>({
  id: '',
  name: '',
  city: '',
  profileImage: '',
  caption: '',
  interests: [],
});  
useFocusEffect(
  useCallback(() => {
    loadUser();
  }, []),
);
 const loadUser = async () => {
  try {
    setLoading(true);

    const userDoc = await getCurrentUserDoc();

    if (!userDoc?.exists()) {
      return;
    }

    const data = userDoc.data();

    setUser({
      id: data.id ?? '',
      name: data.name ?? '',
      city: data.city ?? '',
      profileImage: data.profileImage ?? '',
      caption: data.caption ?? '',
      interests: data.interests ?? [],
    });
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Failed to load profile');
  } finally {
    setLoading(false);
  }
};

 if (loading) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#FF4458" />
    </View>
  );
}

return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}>
    <Image
      source={{
        uri:
          user.profileImage ||
          'https://via.placeholder.com/200',
      }}
      style={styles.profileImage}
    />

    <Text style={styles.name}>{user.name}</Text>

    <Text style={styles.city}>{user.city}</Text>

    <Text style={styles.bio}>
      {user.caption || 'No caption added'}
    </Text>

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
          <Text>No interests added</Text>
        )}
      </View>
    </View>

    <View style={styles.section}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            ROUTES.UPDATEPROFILE_SCR,
          )
        }
        style={styles.button}>
        <Text style={styles.buttonText}>
          Edit Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Settings
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.logoutButton,
        ]}>
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  header: {
    paddingTop: vs(60),
    paddingBottom: vs(20),
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: ms(28),
    fontWeight: '700',
    color: COLORS.BACKGROUND_RED,
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
    backgroundColor:
      COLORS.PROFILE_CHIP_BACKGROUND,
    paddingHorizontal: s(18),
    paddingVertical: vs(10),
    borderRadius: ms(20),
  },

  chipText: {
    color: COLORS.BACKGROUND_RED,
    fontSize: ms(14),
    fontWeight: '600',
  },

  button: {
    backgroundColor:
      COLORS.PROFILE_BUTTON_BACKGROUND,
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
    backgroundColor:
      COLORS.PROFILE_CHIP_BACKGROUND,
  },

  logoutText: {
    color: COLORS.BACKGROUND_RED,
    fontSize: ms(16),
    fontWeight: '700',
  },
});
