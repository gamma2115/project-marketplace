# project-marketplace
A marketplace for buying and selling projects
# ProjectMarket - Buy & Sell Projects

A complete marketplace platform where users can buy and sell digital projects, code, templates, and more.

## 🚀 Features

- User Authentication (Login/Register)
- Browse Projects
- Shopping Cart
- User Dashboard
- Sell Projects (Upload with images)
- Order Management
- Profile Management

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Firebase (Auth, Firestore, Storage)

## 🔧 Setup Instructions

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the steps
3. Register a web app to get your configuration

### 2. Enable Firebase Services
- **Authentication**: Enable Email/Password sign-in
- **Firestore Database**: Create in test mode
- **Storage**: Create in test mode

### 3. Update Configuration
Replace the `firebaseConfig` in `config.js` with your own configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
