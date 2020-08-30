import React, {Component} from 'react';
import {View, Image, ViewStyle, ImageStyle} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import images from 'res/images';

type Props = {
  hide?: boolean;
  onPress?: Function;
  image: string;
  imageStyle?: ImageStyle;
  style?: ViewStyle;
};

export default class MapBackButton extends Component<Props> {
  static defaultProps = {
    hide: false,
    onPress: () => {},
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (this.props.hide) {
      return null;
    }

    const buttonSize = hp('5%');
    const defaultImageStyle = {
      flex: 1,
      width: buttonSize,
    };
    return (
      <View
        style={Object.assign(
          {
            width: buttonSize,
            height: buttonSize,
          },
          this.props.style,
        )}>
        <TouchableScale
          style={Object.assign(defaultImageStyle, this.props.imageStyle)}
          onPress={this.props.onPress}>
          <Image
            source={images[this.props.image]}
            style={Object.assign(defaultImageStyle, this.props.imageStyle)}
            resizeMode="contain"
          />
        </TouchableScale>
      </View>
    );
  }
}
