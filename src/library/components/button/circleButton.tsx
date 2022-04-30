import React, {Component} from 'react';
import {View, Image, ViewStyle, ImageStyle} from 'react-native';

import {hp} from '@library/services/deviceService';

// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import R from '@res/R';

type Props = {
  hide?: boolean;
  onPress?: Function;
  image: string;
  imageStyle?: ImageStyle;
  style?: ViewStyle;
  delay?: number;
};

export default class MapBackButton extends Component<Props> {
  static defaultProps = {
    hide: false,
    onPress: () => {},
    delay: 300,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (this.props.hide) {
      return null;
    }

    const buttonSize = hp('5%');
    const style = Object.assign(
      {
        width: buttonSize,
        height: buttonSize,
      },
      this.props.style,
    );

    return (
      <View style={style}>
        <TouchableScale
          style={style}
          onPress={() => {
            setTimeout(this.props.onPress, this.props.delay);
          }}>
          <Image
            resizeMode="contain"
            source={R.img(this.props.image)}
            style={Object.assign(
              {width: style.width, height: style.height},
              this.props.imageStyle,
            )}
          />
        </TouchableScale>
      </View>
    );
  }
}
