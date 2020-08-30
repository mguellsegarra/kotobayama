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
