import React, {Component} from 'react';
import {Image} from 'react-native';
import {View} from 'react-native-animatable';

import R, {Images} from '@res/R';
import {styles} from './livesIndicator.style';

type Props = {
  lives: number;
};

export default class LivesIndicator extends Component<Props> {
  containerView: any;

  animate(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  render() {
    const imagesForLifes: any = {
      0: {
        first: Images.heart_black_icon_details,
        second: Images.heart_black_icon_details,
        third: Images.heart_black_icon_details,
      },
      1: {
        first: Images.heart_icon_details,
        second: Images.heart_black_icon_details,
        third: Images.heart_black_icon_details,
      },
      2: {
        first: Images.heart_icon_details,
        second: Images.heart_icon_details,
        third: Images.heart_black_icon_details,
      },
      3: {
        first: Images.heart_icon_details,
        second: Images.heart_icon_details,
        third: Images.heart_icon_details,
      },
    };

    const currentImages = imagesForLifes[this.props.lives];

    return (
      <View
        style={styles.container}
        ref={(ref) => {
          this.containerView = ref;
        }}
        useNativeDriver>
        <Image style={styles.image} source={R.img(currentImages.first)} />
        <Image style={styles.image} source={R.img(currentImages.second)} />
        <Image style={styles.image} source={R.img(currentImages.third)} />
      </View>
    );
  }
}
