import React from 'react';
import {Image} from 'react-native';

import R from 'src/res';

const ImagePrefetcher = {
  getImages: () => {
    return Object.keys(R.images).map((key) => {
      return <Image key={key} source={R.images[key]} style={{opacity: 0}} />;
    });
  },
};

export default ImagePrefetcher;
