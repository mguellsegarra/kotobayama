node node_modules/react-native/cli.js bundle \
    --entry-file index.js \
    --platform android \
    --dev false \
    --reset-cache \
    --bundle-output ./android-release.bundle \
    --sourcemap-output ./android-release.bundle.map
curl --http1.1 https://upload.bugsnag.com/react-native-source-map \
   -F apiKey=3c86cec137dce1bf5e2a5fb37bce82ab \
   -F appVersion=1.0 \
   -F appVersionCode=1 \
   -F dev=false \
   -F platform=android \
   -F sourceMap=@android-release.bundle.map \
   -F bundle=@android-release.bundle \
   -F projectRoot=`pwd`
rm ./android-release.bundle
rm ./android-release.bundle.map