import React, {Component} from 'react';
import {View, Image, Animated} from 'react-native';
import {getStyles} from './splash.style';
import ImageService from '../../services/imageService';

export default class Splash extends Component<> {
  styles: Object;

  state = {
    fadeAnim: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      delay: 1000,
      duration: 800,
      useNativeDriver: true,
    }).start(({finished}) => {
      Animated.timing(this.state.fadeAnim, {
        delay: 1200,
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(({finished}) => {
        this.props.navigation.navigate('LevelMap');
      });
    });
  };

  componentDidMount() {
    this.startAnimation();
  }

  render() {
    this.styles = getStyles();

    return (
      <View style={this.styles.background}>
        <Animated.View
          style={[
            {
              opacity: this.state.fadeAnim, // Bind opacity to animated value
            },
          ]}>
          <Image
            source={ImageService.getImage('ondori_logo')}
            style={this.styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    );
  }
}
