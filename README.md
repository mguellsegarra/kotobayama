<p align="center">
  <img src="https://github.com/mguellsegarra/kotobayama/blob/master/src/res/images/ui/logo_and_ribbon@2x.png?raw=true" alt="kotobayama" width="337" />
</p>

# 🏔🀄️ kotobayama

**kotobayama**: *Mountain of words* ([言葉 - kotoba](https://jisho.org/search/%E8%A8%80%E8%91%89), [山 - yama](https://jisho.org/search/%E5%B1%B1)). 

A prototype for a React Native guess-the-word game.

Guess the words for famous mountain summits, huts, lakes, hills,... Fully customizable, hints, levels.

In this demo version there is a level for guessing huts, summits and lakes from [Aigüestortes i Estany de Sant Maurici National Park](https://en.wikipedia.org/wiki/Aig%C3%BCestortes_i_Estany_de_Sant_Maurici_National_Park), an amazing place in Catalonia where you can enjoy a high-mountain crossing, called [Carros de Foc](https://www.carrosdefoc.com/en/).

## Screenshots

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="300" src="https://user-images.githubusercontent.com/5711443/166101949-78192471-8645-4a53-8d7c-66cccc4dd405.gif"> |  <img width="300" src="https://github.com/mguellsegarra/kotobayama/blob/master/screenshots/level1.gif?raw=true">|<img width="300" src="https://github.com/mguellsegarra/kotobayama/blob/master/screenshots/level_nav.gif?raw=true">|
|<img width="300"  src="https://github.com/mguellsegarra/kotobayama/blob/master/screenshots/photo_detail.gif?raw=true">  |  <img width="300" src="https://github.com/mguellsegarra/kotobayama/blob/master/screenshots/record_game.gif?raw=true">|<img width="300" src="https://user-images.githubusercontent.com/5711443/166102226-88734c1d-b9ce-4d02-bbc0-b74a3194d342.png">|



## Tech stack

- Android and iOS support
- TypeScript
- [React Navigation](https://reactnavigation.org/)
- [MobX](https://mobx.js.org/) for state management
- [Bugsnag](https://www.bugsnag.com/) error monitoring with sourcemap support
- Localization and i18n - [react-native-localize](https://github.com/zoontek/react-native-localize)
- Linear gradient backgrounds - [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
- Remote images fetching and caching - [react-native-image-cache-wrapper](https://github.com/wonday/react-native-image-cache-wrapper)
- Progress bars - [react-native-progress](https://github.com/oblador/react-native-progress)
- Animations with [Animated API](https://reactnative.dev/docs/animated), [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and [react-native-touchable-scale](https://github.com/kohver/react-native-touchable-scale)
- Custom maps using [Mapbox](https://www.mapbox.com/) and Google Maps API - [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- Custom screenshot for sharing and asking questions to friends - [react-native-view-shot](https://github.com/gre/react-native-view-shot) + [react-native-share](https://github.com/react-native-share/react-native-share)
- Fancy confetti effect - [react-native-confetti](https://github.com/hyperjumptech/react-native-confetti)
- Pan and zoom images - [react-native-image-pan-zoom](https://github.com/ascoders/react-native-image-zoom)
- [Handy script](https://github.com/mguellsegarra/kotobayama/blob/master/scripts/images.js) for resizing and preparing images for both iOS and Android platforms

## Building

- Replace your Google Maps API keys in `android/app/src/main/AndroidManifest.xml` and `ios/kotobayama/AppDelegate.m`.
- Run as usually with `npm run ios` - `npm run android`.

## TODO

- Implement in-app purchases with [RevenueCat](https://www.revenuecat.com/)
- Create more levels
- Level selection screen
- Level localization and language support
- Sounds, FX, and music

## Credits and attribution

- Art and UI: [GUI PRO Kit Fantasy RPG](https://assetstore.unity.com/packages/2d/gui/gui-pro-kit-fantasy-rpg-170168) - Paid. **IMPORTANT**. Please contact the [author](http://www.layerlab.io/) before using or distributing.
- Fonts: [Midorima](https://www.1001fonts.com/midorima-personal-use-font.html) and few Google Fonts.

## License

Licensed under the incredibly permissive MIT license

Copyright © 2020 Marc Güell Segarra

