import React, {Component} from 'react';
import {View} from 'react-native';
import CachedImage from 'react-native-image-cache-wrapper';

type Props = {
  source: any;
  style: any;
  resizeMode?: any;
  children?: any;
};

export default class RemoteImageBackground extends Component<Props> {
  render() {
    return (
      <View style={this.props.style}>
        <CachedImage
          resizeMode={this.props.resizeMode}
          style={this.props.style}
          source={this.props.source}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            zIndex: 5,
          }}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
