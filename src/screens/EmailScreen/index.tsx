import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/navigation';
import { ROUTES } from '../../constants/routes';
import { signInOrSignUp } from '../../services/authService';
import { runWithAuthHandling } from '../../utils/runWithAuthHandling';
import { isEmailFormValid } from '../../utils/emailValidation';
import { styles } from './styles';

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
  const [loading, setLoading] = useState(false);

  const isNextEnabled = isEmailFormValid(email, password);

  const handleSubmit = async () => {
    if (!isNextEnabled || loading) return;

    const result = await runWithAuthHandling(
      () => signInOrSignUp(email.trim(), password),
      { setLoading, errorTitle: 'Sign in failed' },
    );

    if (!result.success) return;

    if (result.data.isNewUser) {
      navigation.navigate(ROUTES.PROFILEPIC_UPLOAD_SCR);
    } else {
      navigation.navigate(ROUTES.BOTTOM_TABS, { screen: ROUTES.STACK_SCR });
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
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Create or {'\n'}login</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.emailInput}
              placeholder="Enter email"
              placeholderTextColor="#8A8A8E"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              autoFocus
              editable={!loading}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.emailInput}
              placeholder="Password"
              placeholderTextColor="#8A8A8E"
              secureTextEntry
              textContentType="password"
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>
        </View>

        {/* Next button */}
        <TouchableOpacity
          style={[styles.nextButton, { opacity: isNextEnabled ? 1 : 0.5 }]}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={!isNextEnabled || loading}
        >
          <Text style={styles.nextButtonText}>
            {loading ? 'Please Wait...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmailScreen;


