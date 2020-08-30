const ImageService = {
  initialized: false,
  images: {},
  requireImages: () => ({
    ondori_logo: require('../images/ondori_logo.png'),
    mapTitleContainer: require('../images/mapTitleContainer.png'),
    mapButton: require('../images/mapButton.png'),
    backButton: require('../images/backButton.png'),
    buttonYellow: require('../images/buttonYellow.png'),
    marker_1: require('../images/marker_1.png'),
    marker_2: require('../images/marker_2.png'),
    marker_3: require('../images/marker_3.png'),
    marker_4: require('../images/marker_4.png'),
    marker_5: require('../images/marker_5.png'),
    marker_6: require('../images/marker_6.png'),
    marker_7: require('../images/marker_7.png'),
    marker_8: require('../images/marker_8.png'),
    marker_9: require('../images/marker_9.png'),
    navButtonBackgroundLeft: require('../images/navButtonBackgroundLeft.png'),
    navButtonBackgroundRight: require('../images/navButtonBackgroundRight.png'),
    mapNavBackButton: require('../images/mapNavBackButton.png'),
    rightArrow: require('../images/rightArrow.png'),
    leftArrow: require('../images/leftArrow.png'),
    levelNumberContainer: require('../images/levelNumberContainer.png'),
    levelChooserBg: require('../images/levelChooserBg.png'),
    photoFrame: require('../images/photoFrame.png'),
    level_10001: require('../images/levels/10001.jpg'),
    level_10002: require('../images/levels/10002.jpg'),
    level_10003: require('../images/levels/10003.jpg'),
    level_10004: require('../images/levels/10004.jpg'),
    level_10005: require('../images/levels/10005.jpg'),
    level_10006: require('../images/levels/10006.jpg'),
    level_10007: require('../images/levels/10007.jpg'),
    level_10008: require('../images/levels/10008.jpg'),
    level_10009: require('../images/levels/10009.jpg'),
  }),
  init: () => {
    ImageService.images = ImageService.requireImages();
  },
  getImage: (key: string) => {
    if (!ImageService.initialized) {
      ImageService.init();
    }
    return ImageService.images[key];
  },
};

export default ImageService;
