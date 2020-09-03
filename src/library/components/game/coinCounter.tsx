import React, {Component} from 'react';
import {View, Image} from 'react-native';

import R, {Images} from '@res/R';
import {getStyles} from './livesIndicator.style';

type Props = {
  lives: number;
};

export default class CoinCounter extends Component<Props> {
  render() {
    const styles = getStyles();

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
      <View style={styles.container}>
        <Image style={styles.image} source={R.img(currentImages.first)} />
        <Image style={styles.image} source={R.img(currentImages.second)} />
        <Image style={styles.image} source={R.img(currentImages.third)} />
      </View>
    );
  }
}
