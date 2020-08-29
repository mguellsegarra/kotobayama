import React, {Component} from 'react';
import {View} from 'react-native';

import {getStyles} from './genericComponent.style';

export default class GenericComponent extends Component {
  state = {
    enabled: false,
  };

  constructor() {
    super();
    this.method = this.method.bind(this);

    this.state = {
      enabled: false,
    };
  }

  render() {
    this.styles = getStyles();

    return <View />;
  }
}
