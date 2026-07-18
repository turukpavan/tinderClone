// hooks/useProfilePhotoPicker.ts (updated)
import { useState, useCallback } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { uploadImageFromUrl } from '../services/cloudinaryService';

const showPermissionDeniedAlert = (permissionName: string) => {
  Alert.alert(
    `${permissionName} access needed`,
    `Please enable ${permissionName.toLowerCase()} access in your device settings to continue.`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ],
  );
};

const requestPermission = async (
  permission: string,
  name: string,
): Promise<boolean> => {
  const status = await check(permission as any);
  if (status === RESULTS.GRANTED) return true;
  const result = await request(permission as any);
  if (result === RESULTS.GRANTED) return true;
  showPermissionDeniedAlert(name);
  return false;
};

export const useProfilePhotoPicker = (initialImage: string) => {
  const [image, setImage] = useState<string>(initialImage);
  const [uploading, setUploading] = useState(false);

  const uploadAsset = useCallback(async (asset: Asset | undefined) => {
    if (!asset?.uri) return;
    setUploading(true);
    try {
      const imageUrl = await uploadImageFromUrl(asset.uri);
      setImage(imageUrl);
    } catch (error) {
      console.log('Image upload error', error);
      Alert.alert(
        'Upload failed',
        "We couldn't upload your photo. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  }, []);

  const pickFromGallery = useCallback(async () => {
    if (uploading) return;
    const permission =
      Platform.OS === 'android'
        ? Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;

    const granted = await requestPermission(permission, 'Photo library');
    if (!granted) return;

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });
    if (result.didCancel) return;
    await uploadAsset(result.assets?.[0]);
  }, [uploading, uploadAsset]);

  const pickFromCamera = useCallback(async () => {
    if (uploading) return;
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    const granted = await requestPermission(permission, 'Camera');
    if (!granted) return;

    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
      cameraType: 'front',
    });
    if (result.didCancel) return;
    await uploadAsset(result.assets?.[0]);
  }, [uploading, uploadAsset]);

  const setImageExternally = useCallback((url: string) => setImage(url), []);

  return {
    image,
    uploading,
    pickFromGallery,
    pickFromCamera,
    setImageExternally,
  };
};
