import React, {Component} from 'react';
import {ImageBackground, Text} from 'react-native';
import {View} from 'react-native-animatable';

import {styles} from '@screens/levelMap/levelMap.style';
import R, {Images} from '@res/R';
import PackProgress from './packProgress';

type Props = {
  title: string;
  progress: number;
  pointerEvents: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
};

export default class MapTitleBanner extends Component<Props> {
  containerView: any;

  animate(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  render() {
    return (
      <View
        style={styles.titleOverlay}
        useNativeDriver
        ref={(ref) => {
          this.containerView = ref;
        }}
        pointerEvents={this.props.pointerEvents}>
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
