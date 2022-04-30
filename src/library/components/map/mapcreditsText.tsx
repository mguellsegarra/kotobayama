import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Fonts} from '@res/R';
import {hp} from '@library/services/deviceService';
import {MapTypeMode} from '@library/models/mapTypeMode';
import {View as AnimatableView} from 'react-native-animatable';

type Props = {
  style: any;
  mode: MapTypeMode;
  animatedRef: any;
};

export default class MapboxCreditsText extends Component<Props> {
  render() {
    const colorForType =
      this.props.mode === MapTypeMode.Sat
        ? {color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)'}
        : {color: 'black', textShadowColor: 'rgba(255, 255, 255, 0.75)'};
    return (
      <AnimatableView
        style={this.props.style}
        ref={(ref) => {
          this.props.animatedRef(ref);
        }}>
        <View style={styles.container}>
          <View style={styles.textLeft}>
            <Text style={[styles.text, colorForType]}>
              {this.props.mode === MapTypeMode.Sat ? '© Google' : '© Mapbox'}
            </Text>
          </View>
        </View>
      </AnimatableView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: hp('0.8%'),
    flex: 1,
  },
  text: {
    fontFamily: Fonts.alata,
    fontSize: hp('1.2%'),
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
});
