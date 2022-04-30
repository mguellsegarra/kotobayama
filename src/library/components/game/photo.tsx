import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Fonts} from '@res/R';
import {Level} from '@library/models/level';

import {strings} from '@library/services/i18nService';
import PhotoFrame, {PhotoFrameSize} from '@library/components/photo/photoFrame';

import {wp, hp} from '@library/services/deviceService';

type Props = {
  style: any;
  level: Level;
};

export default class Photo extends Component<Props> {
  render() {
    return (
      <View style={this.props.style}>
        <PhotoFrame size={PhotoFrameSize.big} level={this.props.level} />
        <Text style={styles.sourceText}>
          {strings('sourcePhoto') + ': ' + this.props.level.sourcePhoto}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sourceText: {
    marginTop: hp('0.5%'),
    color: '#ffffffcc',
    fontSize: hp('1.4%'),
    fontFamily: Fonts.josefin_light,
  },
});
