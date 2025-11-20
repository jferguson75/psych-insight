#!/bin/bash

# Setup GitHub Actions for Firebase Hosting Deployment
# This script helps you configure the necessary secrets

echo "🔧 Firebase Hosting - GitHub Actions Setup"
echo "=========================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed"
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

echo "✅ Firebase CLI found"
echo ""

# Login to Firebase if needed
echo "📝 Step 1: Login to Firebase"
echo "Running: firebase login"
firebase login

echo ""
echo "📝 Step 2: Initialize GitHub Actions for Firebase Hosting"
echo "This will create a service account and add it to GitHub secrets automatically"
echo ""

firebase init hosting:github

echo ""
echo "✅ Setup complete!"
echo ""
echo "The GitHub Action will now automatically deploy your app to Firebase Hosting"
echo "whenever you push to the main branch."
echo ""
echo "You can also manually trigger a deployment from the Actions tab in GitHub."
