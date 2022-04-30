import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Fonts} from '@res/R';
import LevelIndexNumber from '@library/components/common/levelIndexNumber';

import {wp, hp} from '@library/services/deviceService';

type Props = {
  style: any;
  title: string;
  currentLevel: number;
  totalLevels: number;
};

export default class Title extends Component<Props> {
  render() {
    return (
      <View style={this.props.style}>
        <Text style={styles.titleText} adjustsFontSizeToFit numberOfLines={1}>
          {this.props.title}
        </Text>

        <LevelIndexNumber
          totalLevels={this.props.totalLevels}
          currentLevel={this.props.currentLevel}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    width: wp('100%'),
    padding: hp('1%'),
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
    backgroundColor: '#000000aa',
    fontFamily: Fonts.league,
    fontSize: hp('1.6%'),
    color: 'white',
    textAlign: 'center',
    marginBottom: hp('0.5%'),
  },
});
