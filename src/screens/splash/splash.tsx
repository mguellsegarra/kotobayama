import React, {Component} from 'react';
import {View, Image, Animated} from 'react-native';
import {getStyles} from './splash.style';
import I18n from '@library/services/i18nService';
import ImagePrefetcher from '@library/services/imagePrefetcher';

import R from '@res/R';

type Props = {
  navigation: any;
};

export default class Splash extends Component<Props> {
  styles: any;
  state = {
    fadeAnim: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      delay: 1000,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.fadeAnim, {
        delay: 1200,
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        this.props.navigation.navigate('LevelMap');
      });
    });
  };

  componentDidMount() {
    I18n.init();
    this.startAnimation();
  }

  render() {
    this.styles = getStyles();

    return (
      <View style={this.styles.background}>
        <Animated.View
          style={[
            {
              opacity: this.state.fadeAnim,
            },
          ]}>
          <Image
            source={R.images['ondori_logo']}
            style={this.styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <View style={{width: 0, height: 0, opacity: 0}}>
          {ImagePrefetcher.getImages()}
        </View>
      </View>
    );
  }
}
