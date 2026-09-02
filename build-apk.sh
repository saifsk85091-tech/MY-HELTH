#!/bin/bash
set -e

echo "=== 1. Checking Java ==="
java -version

export ANDROID_SDK_ROOT=/opt/android-sdk
export ANDROID_HOME=/opt/android-sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

echo "=== 2. Setting up Android SDK ==="
mkdir -p /opt/android-sdk/cmdline-tools
if [ ! -d "/opt/android-sdk/cmdline-tools/latest" ]; then
    echo "Downloading Android Command Line Tools..."
    wget -q -O /tmp/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
    unzip -q /tmp/cmdline-tools.zip -d /opt/android-sdk/cmdline-tools
    mv /opt/android-sdk/cmdline-tools/cmdline-tools /opt/android-sdk/cmdline-tools/latest
    rm -f /tmp/cmdline-tools.zip
fi

echo "=== 3. Accepting licenses and installing components ==="
yes | sdkmanager --licenses > /dev/null 2>&1 || true
sdkmanager --install "platform-tools" "platforms;android-34" "build-tools;34.0.0" > /dev/null 2>&1

echo "=== 4. Building web distribution ==="
npm run build

echo "=== 5. Capacitor sync & setup ==="
if [ ! -d "android" ]; then
    npx cap add android
fi
npx cap sync android

echo "=== 6. Compiling Android Debug APK with Gradle ==="
cd android
chmod +x ./gradlew
./gradlew assembleDebug --no-daemon

echo "=== 7. Locating and copying generated APK ==="
cd ..
mkdir -p .build-outputs
mkdir -p APK_DOWNLOAD

APK_PATH=$(find android/app/build/outputs/apk -name "*.apk" | head -n 1)

if [ -z "$APK_PATH" ] || [ ! -f "$APK_PATH" ]; then
    echo "ERROR: APK was not generated!"
    exit 1
fi

echo "Found APK at: $APK_PATH"
cp "$APK_PATH" .build-outputs/app-debug.apk
cp "$APK_PATH" APK_DOWNLOAD/app-debug.apk

echo "=== 8. Verifying APK sizes and validity ==="
ls -lh .build-outputs/app-debug.apk
ls -lh APK_DOWNLOAD/app-debug.apk

echo "=== BUILD SUCCESSFUL! ==="
