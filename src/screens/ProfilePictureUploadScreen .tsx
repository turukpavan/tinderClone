import React, { useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/routes';
import { RootStackParamList } from '../navigation/navigation';
import { uploadImageFromUrl } from '../services/cloudinaryService';
import { saveProfile } from '../services/userService';
import { ms, s, vs } from '../utils/scaling';
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PROFILEPIC_UPLOAD_SCR'
>;

const DUMMY_IMAGE = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const ProfilePictureUploadScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [image, setImage] = useState<string>(DUMMY_IMAGE);
  const [city, setCity] = useState<string>('');

  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      return true;
    }

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  };

  const handleGallery = async () => {
    const permission =
      Platform.OS === 'android'
        ? Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;

    const status = await request(permission);

    if (status !== RESULTS.GRANTED) {
      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    const asset: Asset | undefined = result.assets?.[0];

    if (asset?.uri) {
      const imageUrl = await uploadImageFromUrl(asset.uri);

      setImage(imageUrl);
    }
  };

  const handleCamera = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      return;
    }

    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
      cameraType: 'front',
    });

    const asset: Asset | undefined = result.assets?.[0];

    if (asset?.uri) {
      const imageUrl = await uploadImageFromUrl(asset.uri);

      setImage(imageUrl);
    }
  };

  const handleNext = async () => {
    try {
      await saveProfile(image, city);

      navigation.navigate(ROUTES.BOTTOM_TABS, {
        screen: ROUTES.STACK_SCR,
      });
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add your profile photo</Text>

      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.profileImage} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your city"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleGallery}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Choose from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCamera}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePictureUploadScreen;

const styles = StyleSheet.create({
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
});
