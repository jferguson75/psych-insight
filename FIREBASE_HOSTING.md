# Firebase Hosting Deployment Guide

This guide will help you deploy your Psyche Insight app to Firebase Hosting.

## Prerequisites

- Firebase CLI installed ✅ (already installed)
- A Firebase project created
- Firebase configuration added to your app

## Step 1: Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication. Sign in with your Google account.

## Step 2: Set Your Firebase Project

Find your Firebase project ID from the Firebase Console (Project Settings), then run:

```bash
firebase use --add
```

Select your project from the list and give it an alias (e.g., "default").

Or manually update `.firebaserc`:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

## Step 3: Build the Web App

```bash
npx expo export --platform web
```

This creates an optimized production build in the `dist` directory.

## Step 4: Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

Your app will be deployed to: `https://your-project-id.web.app`

## Quick Deploy Script

Add this to your `package.json` scripts:

```json
"scripts": {
  "deploy": "npx expo export --platform web && firebase deploy --only hosting"
}
```

Then deploy with:
```bash
npm run deploy
```

## What Gets Deployed

- **Public Directory**: `dist/` (contains the built web app)
- **Routing**: All routes redirect to `index.html` (SPA behavior)
- **Caching**: Static assets cached for 1 year
- **URL Paths**: 
  - `/` - Landing page
  - `/login` - Login page
  - `/signup` - Sign up page
  - `/interview` - Interview page (requires auth)

## Firebase Hosting Features

### Custom Domain
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS setup instructions

### Preview Channels (for testing)
```bash
firebase hosting:channel:deploy preview-name
```

### Rollback to Previous Version
1. Go to Firebase Console → Hosting
2. Click the three dots next to a previous deployment
3. Click "Rollback"

## Important Notes

1. **Environment Variables**: Make sure your `.env` file is NOT committed to Git
2. **Firebase Config**: Your Firebase config should be added to `src/config/firebase.js`
3. **Google Auth**: Update the authorized domains in Firebase Console:
   - Go to Authentication → Settings → Authorized domains
   - Add your Firebase Hosting domain (e.g., `your-project-id.web.app`)

## Troubleshooting

### "Authentication Error"
Run: `firebase login --reauth`

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript/ESLint errors: `npm run web`

### Deployment Fails
- Check firebase.json configuration
- Ensure the `dist` directory exists and contains `index.html`
- Verify you have the correct permissions in Firebase Console

## Continuous Deployment (Optional)

### GitHub Actions
Create `.github/workflows/firebase-hosting.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx expo export --platform web
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-firebase-project-id
```

## Monitoring

After deployment, monitor your app:
- Firebase Console → Hosting → Usage
- Firebase Console → Analytics (if enabled)
- Check the live URL to ensure everything works

## Next Steps

1. Deploy your app
2. Test all functionality on the live URL
3. Set up a custom domain (optional)
4. Enable Firebase Analytics (optional)
5. Set up continuous deployment (optional)

Your app is now ready to be deployed to Firebase Hosting! 🚀
