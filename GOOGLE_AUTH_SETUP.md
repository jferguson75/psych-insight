# Google Authentication Setup Guide

This guide will walk you through setting up Google Authentication for your Psyche Insight app.

## Step 1: Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** > **Sign-in method**
4. Click on **Google** in the Sign-in providers list
5. Click the **Enable** toggle
6. Enter your project's public-facing name (e.g., "Psyche Insight")
7. Enter your support email
8. Click **Save**

## Step 2: Configure for Web (Required)

The web configuration is already set up in the code and will work immediately after enabling Google Sign-In in Firebase.

### How It Works

The app uses Firebase's **redirect-based authentication** (`signInWithRedirect`) which:
- Redirects the user to Google's sign-in page
- Returns to your app after authentication
- Automatically handles the sign-in process
- Works reliably with Expo Web and avoids popup blockers

### Test on Web

1. Run `npm run web`
2. Navigate to the Login or Sign Up page
3. Click "Continue with Google"
4. You'll be redirected to Google's sign-in page
5. Select your Google account
6. You'll be redirected back and automatically signed in

## Step 3: Configure for iOS (Optional - Future)

To enable Google Sign-In on iOS, you'll need to:

1. **Get OAuth Client ID:**
   - In Firebase Console, go to Project Settings
   - Scroll to "Your apps"
   - Find your iOS app
   - Copy the iOS URL scheme (looks like: `com.googleusercontent.apps.XXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

2. **Configure URL Schemes:**
   - Add to `app.json`:
   ```json
   "ios": {
     "supportsTablet": true,
     "bundleIdentifier": "com.psycheinsight.app",
     "config": {
       "googleSignIn": {
         "reservedClientId": "YOUR_IOS_CLIENT_ID_HERE"
       }
     }
   }
   ```

3. **Install Native Dependencies:**
   ```bash
   npx expo install @react-native-google-signin/google-signin
   ```

4. **Rebuild the app:**
   ```bash
   eas build --platform ios
   ```

## Step 4: Configure for Android (Optional - Future)

To enable Google Sign-In on Android:

1. **Get SHA-1 Certificate Fingerprint:**
   ```bash
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```

2. **Add SHA-1 to Firebase:**
   - In Firebase Console, go to Project Settings
   - Scroll to "Your apps" section
   - Click on your Android app
   - Click "Add fingerprint"
   - Paste your SHA-1 certificate fingerprint
   - Click Save

3. **Download google-services.json:**
   - Download the updated `google-services.json` file
   - Place it in the root of your project

4. **Update app.json:**
   ```json
   "android": {
     "package": "com.psycheinsight.app",
     "googleServicesFile": "./google-services.json"
   }
   ```

5. **Rebuild the app:**
   ```bash
   eas build --platform android
   ```

## Current Implementation Notes

### Web Support ✅
- **Status:** Fully implemented and working
- **Method:** Firebase `signInWithPopup`
- **Requirements:** None - works out of the box after enabling in Firebase

### Mobile Support 📱
- **Status:** Placeholder implemented
- **iOS:** Requires additional configuration (see Step 3)
- **Android:** Requires additional configuration (see Step 4)
- **Current Behavior:** Shows error message directing users to use email/password

## Security Considerations

1. **Scopes:** The implementation requests only `profile` and `email` scopes
2. **User Data:** Profile data (name, email, photo) is stored in Firestore
3. **Auth Provider:** Marked as 'google' in user profile for tracking
4. **Privacy:** Complies with Google's OAuth policies

## Testing Google Sign-In

### Web Testing
1. Start the app: `npm run web`
2. Go to Sign Up or Login page
3. Click "Continue with Google"
4. Select a Google account
5. Grant permissions
6. Verify you're redirected to the Interview screen
7. Check Firebase Console > Authentication to see the new user
8. Check Firestore > users collection to see the user profile

### What Gets Stored

When a user signs in with Google, the following is stored in Firestore:

```javascript
{
  email: "user@gmail.com",
  displayName: "John Doe",
  photoURL: "https://lh3.googleusercontent.com/...",
  createdAt: "2025-11-20T...",
  subscriptionStatus: "free",
  authProvider: "google"
}
```

## Troubleshooting

### "Access Blocked" Error
- **Cause:** Your OAuth consent screen is not configured
- **Solution:** Configure OAuth consent screen in Google Cloud Console

### "Popup Closed by User"
- **Cause:** User closed the Google Sign-In popup
- **Solution:** Normal behavior, no action needed

### "Configuration Not Found"
- **Cause:** Google Sign-In not enabled in Firebase
- **Solution:** Follow Step 1 to enable it

### Works on Web but Not Mobile
- **Cause:** Mobile requires additional native configuration
- **Solution:** Follow Steps 3 and 4 for iOS/Android setup

## Future Enhancements

- [ ] Implement native Google Sign-In for iOS
- [ ] Implement native Google Sign-In for Android
- [ ] Add Google Sign-In button with actual Google logo
- [ ] Add "Sign in with Apple" option (iOS requirement)
- [ ] Add loading states during OAuth flow
- [ ] Add profile picture display in app
- [ ] Implement account linking (merge Google and email accounts)

## Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth/web/google-signin)
- [Expo AuthSession Docs](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google Sign-In Branding Guidelines](https://developers.google.com/identity/branding-guidelines)

---

**Note:** For production deployment, make sure to:
1. Set up OAuth consent screen in Google Cloud Console
2. Add authorized domains to Firebase Authentication settings
3. Configure proper redirect URIs for your production domain
4. Review and comply with Google's OAuth policies
