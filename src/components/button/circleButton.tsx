import React, {Component} from 'react';
import {View, Image} from 'react-native';

// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import ImageService from '../../services/imageService';

type Props = {
  hide?: boolean;
  onPress?: Function;
  image: string;
  imageStyle: any;
  style: any;
};

export default class MapBackButton extends Component<Props> {
  styles: any;

  static defaultProps = {
    hide: false,
    onPress: () => {},
    imageStyle: {},
  };

  constructor(props: Props) {
    super(props);

    this.styles = {};
  }

  render() {
    if (!this.props.hide) {
      return (
        <View style={this.props.style}>
          <TouchableScale
            style={this.props.imageStyle}
            onPress={this.props.onPress}>
            <Image
              source={ImageService.getImage(this.props.image)}
              style={this.props.imageStyle}
              resizeMode="contain"
            />
          </TouchableScale>
        </View>
      );
    } else {
      return null;
    }
  }
}
