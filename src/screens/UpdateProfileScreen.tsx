import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { getCurrentUserDoc,  updateProfile } from '../services/userService';
import { uploadImageFromUrl } from '../services/cloudinaryService';
import { ms, s, vs } from 'react-native-size-matters';
import { COLORS } from '../constants/colors';


const UpdateProfileScreen = () => {
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [caption, setCaption] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);


      const userDoc = await getCurrentUserDoc();

      if (!userDoc.exists()) {
        return;
      }

      const data = userDoc.data();

      setProfileImage(data?.profileImage || '');
      setName(data?.name || '');
      setCity(data?.city || '');
      setCaption(data?.caption || '');

      setInterests(
        Array.isArray(data?.interests) ? data.interests.join(', ') : '',
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = () => {
    Alert.alert('Choose Profile Photo', '', [
      {
        text: 'Camera',
        onPress: openCamera,
      },
      {
        text: 'Gallery',
        onPress: openGallery,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        return;
      }

      const uri = result.assets?.[0]?.uri;

      if (!uri) {
        return;
      }

      setLoading(true);

      const imageUrl = await uploadImageFromUrl(uri);

      if (imageUrl) {
        setProfileImage(imageUrl);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setLoading(false);
    }
  };

  const openCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });

      if (result.didCancel) {
        return;
      }

      const uri = result.assets?.[0]?.uri;

      if (!uri) {
        return;
      }

      setLoading(true);

      const imageUrl = await uploadImageFromUrl(uri);

      if (imageUrl) {
        setProfileImage(imageUrl);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to capture image');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateProfile({
        name,
        profileImage,
        city,
        caption,
        interests: interests
          .split(',')
          .map(item => item.trim())
          .filter(Boolean),
      });

      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF4458" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
        <Image
          source={{
            uri: profileImage || 'https://via.placeholder.com/150',
          }}
          style={styles.image}
        />

        <Text style={styles.changePhotoText}>Change profile photo</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>

      <TextInput
        value={name}
        style={[styles.input, styles.input]}
        onChangeText={setName}
        placeholder="Enter Name"
      />

      <Text style={styles.label}>City</Text>

      <TextInput
        value={city}
        onChangeText={setCity}
        style={styles.input}
        placeholder="Enter city"
      />

      <Text style={styles.label}>Caption</Text>

      <TextInput
        value={caption}
        onChangeText={setCaption}
        style={[styles.input, styles.multiline]}
        multiline
        placeholder="Write something about yourself..."
      />

      <Text style={styles.label}>Interests</Text>

      <TextInput
        value={interests}
        onChangeText={setInterests}
        style={[styles.input, styles.multiline]}
        placeholder="Music, Travel, Gym"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateProfileScreen;


const styles = StyleSheet.create({
  container: {
    padding: s(20),
    paddingBottom: vs(40),
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  loaderContainer: {
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

  disabledInput: {
    backgroundColor: '#F3F3F3',
    color: COLORS.COLOR_PLACEHOLDER,
  },

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
