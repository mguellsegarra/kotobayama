import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import CachedImage from 'react-native-image-cache-wrapper';

type Props = {
  source: any;
  style: any;
  resizeMode?: any;
};

export default class RemoteImage extends Component<Props> {
  render() {
    return (
      <View style={this.props.style}>
        <CachedImage
          resizeMode={this.props.resizeMode}
          style={this.props.style}
          source={this.props.source}
        />
      </View>
    );
  }
}
