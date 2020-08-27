/**
 * @format
 * @flow strict-local
 */

const ImageService = {
  initialized: false,
  images: {},
  requireImages: () => ({
    ondori_logo: require('../images/ondori_logo.png'),
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
