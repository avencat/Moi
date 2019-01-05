# Moi

## Install

    Please refer to the link below for the previous commands:
    https://facebook.github.io/react-native/docs/getting-started.html

    You must have yarn installed on your computer:
    https://yarnpkg.com/en/docs/install

    git clone https://github.com/avencat/Moi.git
    cd Moi
    yarn
    
## Post installation step

After installing the project, you need to create a `.env` file at the root of the project with some keys:
```.env
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
```
For the value of these keys, please contact us.

## Deploy a beta with fastlane

You must have fastlane command line tools installed, then:
### For Android
    cd android
    fastlane beta
    
### For iOS
    cd ios
    fastlane beta
    
## Run

    react-native run-ios
    react-native run-android
