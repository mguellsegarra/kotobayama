import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from './levelComplete.style';
import I18n from '@library/services/i18nService';

import R, {Images} from '@res/R';

type Props = {
  navigation: any;
};

export default class LevelComplete extends Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.background}>
        <Text style={{color: '#ffffff'}}>HOLA</Text>
      </View>
    );
  }
}
