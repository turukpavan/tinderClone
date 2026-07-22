# Tinder Clone

A React Native Tinder-style clone with Firebase authentication, OTP verification, profile setup, chat, and swipe-based user interactions.

## Features

- Google Sign-In authentication
- Phone number OTP login and verification
- Email login/sign-up flow
- Profile picture upload and onboarding
- Bottom tabs with home, chat list, and profile screens
- Firebase Firestore and Realtime Database support
- Toast notifications and user-friendly UI

## Prerequisites

- Node.js >= 22.11.0
- npm or Yarn
- Android SDK and emulator or device
- Xcode and CocoaPods for iOS
- Firebase project with Authentication enabled

## Setup

1. Clone the repository:

```sh
git clone <repo-url>
cd tinderClone
```

2. Install dependencies:

```sh
npm install
```

3. Configure Firebase:

- Add your Firebase Android and iOS config files if needed.
- The app uses `@react-native-firebase/app`, `auth`, `database`, and `firestore` from `src/config/firebase.ts`.

4. Configure Google Sign-In:

- Open `src/config/googleAuth.ts`
- Replace the `webClientId` value with your own OAuth 2.0 Web client ID.

5. Install iOS native dependencies (macOS only):

```sh
cd ios
npx pod-install
cd ..
```

## Running the app

Start Metro:

```sh
npm start
```

Run on Android:

```sh
npm run android
```

Run on iOS:

```sh
npm run ios
```

## Available scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Project structure

- `App.tsx` - App entry point and navigation provider
- `src/navigation` - App and tab navigation setup
- `src/screens` - Screen components for login, OTP, chats, profile, and onboarding
- `src/components` - Shared UI components like `OtpVerification` and `Loader`
- `src/hooks` - Custom hooks for auth, profile setup, chat, and OTP handling
- `src/services` - Firebase auth, chat, user, and OTP services
- `src/config` - Firebase and Google auth configuration

## Authentication flow

1. User selects Google, phone, or email login
2. Phone login sends OTP via `src/services/authService.ts`
3. `OtpVerification` verifies the code and resumes the flow
4. New users are prompted to upload a profile picture and enter a city
5. Existing users are routed to the main app tabs

## Notes

- `src/navigation/AppNavigation.tsx` controls the auth state and initial screen routing.
- `src/components/OtpVerification.tsx` handles code input, resend logic, and keyboard interactions.
- `src/screens/ProfilePictureUploadScreen/index.tsx` includes profile photo selection and upload.

## Troubleshooting

- If Google sign-in fails, verify `webClientId` in `src/config/googleAuth.ts`.
- If Firebase auth fails, confirm Firebase project config and app registration.
- For iOS, always run `npx pod-install` after dependency changes.

## License

This project is provided as-is for learning and prototyping.
