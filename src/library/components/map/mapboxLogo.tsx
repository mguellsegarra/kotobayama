import React, {Component} from 'react';
import {Image, Linking, TouchableOpacity} from 'react-native';
import R, {Images} from '@res/R';

type Props = {
  style: any;
  show: boolean;
};

const mapboxUrl = 'https://www.mapbox.com/about/maps/';

export default class MapboxLogo extends Component<Props> {
  async onPress() {
    const supported = await Linking.canOpenURL(mapboxUrl);
    if (!supported) return;
    await Linking.openURL(mapboxUrl);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <TouchableOpacity style={this.props.style} onPress={this.onPress}>
        <Image
          resizeMode="contain"
          source={R.img(Images.mapbox_logo)}
          style={{
            width: this.props.style.width,
            height: this.props.style.height,
          }}
        />
      </TouchableOpacity>
    );
  }
}
