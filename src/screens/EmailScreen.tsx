import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation';
import { ROUTES } from '../constants/routes';
import { signInOrSignUp } from '../services/authService';

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTES.EMAIL_SCR
>;

type Props = {
  navigation: NavigationType;
};
const EmailScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isNextEnabled =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && password.length >= 6;

  const handleSubmit = async () => {
    if (!isNextEnabled) {
      return;
    }

    try {
      const result = await signInOrSignUp(email.trim(), password);

      result.isNewUser
        ? navigation.navigate(ROUTES.PROFILEPIC_UPLOAD_SCR)
        : navigation.navigate(ROUTES.BOTTOM_TABS, {
            screen: 'STACK_SCR',
          });
    } catch (error: any) {
      console.log(error.code);

      if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect password');
      }

      if (error.code === 'auth/invalid-credential') {
        Alert.alert('Invalid email or password');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Create or {'\n'}login</Text>

          {/* Email input */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.emailInput}
              placeholder="Enter email"
              placeholderTextColor="#8A8A8E"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              autoFocus
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.emailInput}
              placeholder="Password"
              placeholderTextColor="#8A8A8E"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* Next button */}
        <TouchableOpacity
          style={[styles.nextButton, { opacity: isNextEnabled ? 1 : 0.5 }]}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={!isNextEnabled}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_DARK,
  },
  flex: {
    flex: 1,
  },
  backButton: {
    marginTop: 12,
    marginLeft: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: COLORS.COLOR_LIGHT,
    fontSize: 26,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  title: {
    color: COLORS.COLOR_LIGHT,
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 46,
    marginBottom: 40,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_BORDER,
    paddingBottom: 10,
    marginBottom: 24,
  },
  emailInput: {
    color: COLORS.COLOR_LIGHT,
    fontSize: 20,
    padding: 0,
  },
  nextButton: {
    backgroundColor: COLORS.BACKGROUND_NXTBTN,
    borderRadius: 30,
    marginHorizontal: 24,
    marginBottom: 32,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: COLORS.COLOR_NXTBTN,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EmailScreen;
