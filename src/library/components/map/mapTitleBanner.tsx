import React, {Component} from 'react';
import {View, ImageBackground, Text} from 'react-native';

import {styles} from '@screens/levelMap/levelMap.style';
import R, {Images} from '@res/R';
import PackProgress from './packProgress';

type Props = {
  hide: boolean;
  title: string;
  progress: number;
};

export default class MapTitleBanner extends Component<Props> {
  render() {
    if (this.props.hide) {
      return null;
    }

    return (
      <View style={styles.titleOverlay}>
        <ImageBackground
          source={R.img(Images.map_title_container)}
          style={styles.mapTitleContainerImage}>
          <Text style={styles.mapTitleText}>{this.props.title}</Text>
          <PackProgress progress={this.props.progress} />
          <View style={styles.progressBarBottomSpace} />
        </ImageBackground>
      </View>
    );
  }
}
