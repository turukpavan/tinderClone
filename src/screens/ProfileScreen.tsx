import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  const user = {
    name: 'Pavan',
    age: 24,
    city: 'Bharuch',
    bio: 'Coffee lover ☕ • Traveler ✈️ • React Native Developer',
    image:
      'https://res.cloudinary.com/dp64jxn0h/image/upload/v1781690681/instaclone/posts/gA8QJtXSPBeSQbL258dgNwpzBdS2_0RUoSQECEWqlhpsZWK2H.jpg',
    interests: ['Music', 'Travel', 'Gym', 'Coding'],
  };

  return (
    <ScrollView style={styles.container}>
    
      <Image source={{ uri: user.image }} style={styles.profileImage} />

      <Text style={styles.name}>
        {user.name}, {user.age}
      </Text>

      <Text style={styles.city}>{user.city}</Text>

      <Text style={styles.bio}>{user.bio}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>

        <View style={styles.interestsContainer}>
          {user.interests.map(item => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF4458',
  },

  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignSelf: 'center',
  },

  name: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
  },

  city: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
  },

  bio: {
    marginTop: 16,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },

  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    backgroundColor: '#FFE5E8',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

  chipText: {
    color: '#FF4458',
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 14,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#FFE5E8',
  },

  logoutText: {
    color: '#FF4458',
    fontSize: 16,
    fontWeight: '700',
  },
});
