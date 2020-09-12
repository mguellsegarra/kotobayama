import React, {Component} from 'react';
import {View, Image, Animated} from 'react-native';
import {styles} from './splash.style';
import I18n from '@library/services/i18nService';

import R, {Images} from '@res/R';

type Props = {
  navigation: any;
};

export default class Splash extends Component<Props> {
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
        this.props.navigation.navigate('Home');
      });
    });
  };

  componentDidMount() {
    I18n.init();
    this.startAnimation();
  }

  render() {
    return (
      <View style={styles.background}>
        <Animated.View
          style={[
            {
              opacity: this.state.fadeAnim,
            },
          ]}>
          <Image source={R.img(Images.ondori_logo)} style={styles.logo} />
        </Animated.View>
      </View>
    );
  }
}
