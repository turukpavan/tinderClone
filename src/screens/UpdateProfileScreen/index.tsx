import React, { useCallback } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { useProfilePhotoPicker } from '../../hooks/useProfilePhotoPicker';
import { useProfileEditor } from '../../hooks/useProfileEditor';
import { DUMMY_IMAGE } from '../../constants/profile';
import { styles } from './styles';
import Loader from '../../components/Loader';

const UpdateProfileScreen = () => {
  const { image, uploading, pickFromGallery, pickFromCamera, setImageExternally } =
    useProfilePhotoPicker(DUMMY_IMAGE);

  const onImageLoaded = useCallback(
    (url: string) => setImageExternally(url || DUMMY_IMAGE),
    [setImageExternally],
  );

  const {
    initialLoading,
    saving,
    name,
    setName,
    city,
    setCity,
    caption,
    setCaption,
    interests,
    setInterests,
    handleUpdate,
  } = useProfileEditor(onImageLoaded);

  const busy = uploading || saving;

  const handleImagePick = () => {
    if (busy) return;
    Alert.alert('Choose Profile Photo', '', [
      { text: 'Camera', onPress: pickFromCamera },
      { text: 'Gallery', onPress: pickFromGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  if (initialLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader size="large" color="#FF4458" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick} disabled={busy}>
        <Image source={{ uri: image }} style={styles.image} />
        {uploading ? (
          <Loader style={styles.imageSpinner} color={COLORS.ICON_ACTIVE} />
        ) : (
          <Text style={styles.changePhotoText}>Change profile photo</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={setName}
        placeholder="Enter Name"
        editable={!busy}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        style={styles.input}
        placeholder="Enter city"
        editable={!busy}
      />

      <Text style={styles.label}>Caption</Text>
      <TextInput
        value={caption}
        onChangeText={setCaption}
        style={[styles.input, styles.multiline]}
        multiline
        placeholder="Write something about yourself..."
        editable={!busy}
      />

      <Text style={styles.label}>Interests</Text>
      <TextInput
        value={interests}
        onChangeText={setInterests}
        style={[styles.input, styles.multiline]}
        placeholder="Music, Travel, Gym"
        editable={!busy}
      />

      <TouchableOpacity
        style={[styles.button, busy && styles.buttonDisabled]}
        onPress={() => handleUpdate(image)}
        disabled={busy}
      >
        <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Update Profile'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdateProfileScreen;




