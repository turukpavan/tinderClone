import React from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { RootStackParamList } from '../../navigation/navigation';
import { useProfilePhotoPicker } from '../../hooks/useProfilePhotoPicker';
import { useProfileSetup } from '../../hooks/useProfileSetup';
import { DUMMY_IMAGE } from '../../constants/profile';
import { styles } from './styles';
import Loader from '../../components/Loader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PROFILEPIC_UPLOAD_SCR'>;

const MAX_CITY_LENGTH = 50;

const ProfilePictureUploadScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const { image, uploading, pickFromGallery, pickFromCamera } =
    useProfilePhotoPicker(DUMMY_IMAGE);

  const { city, setCity, saving, handleNext } = useProfileSetup(() => {
    navigation.navigate(ROUTES.BOTTOM_TABS, { screen: ROUTES.STACK_SCR });
  });

  const busy = uploading || saving;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add your profile photo</Text>

      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        {uploading && (
          <View style={styles.uploadingOverlay}>
            <Loader color={COLORS.COLOR_LIGHT} backgroundColor={COLORS.BACKGROUND_DARK} size="large" />
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your city"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
          style={styles.input}
          maxLength={MAX_CITY_LENGTH}
          editable={!busy}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, busy && styles.buttonDisabled]}
        onPress={pickFromGallery}
        activeOpacity={0.8}
        disabled={busy}
      >
        <Text style={styles.buttonText}>Choose from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, busy && styles.buttonDisabled]}
        onPress={pickFromCamera}
        activeOpacity={0.8}
        disabled={busy}
      >
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => handleNext(image)}
        activeOpacity={0.8}
        disabled={busy}
      >
        <Text style={styles.nextButtonText}>{saving ? 'Saving...' : 'Next'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePictureUploadScreen;




