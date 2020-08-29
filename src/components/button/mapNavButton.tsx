import React, {Component} from 'react';
import {ViewStyle, ImageBackground} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// @ts-ignore
import ImageService from '../../services/imageService';
import CircleButton from './circleButton';

type Props = {
  hide?: boolean;
  onPress?: Function;
  buttonImage: string;
  style?: ViewStyle;
  right?: boolean;
};

export default class MapNavButton extends Component<Props> {
  static defaultProps = {
    hide: false,
    onPress: () => {},
    right: false,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (this.props.hide) {
      return null;
    }

    const bgWidth = hp('10%');
    const bgConstant = 0.897058823529412;
    const bgHeight = bgWidth * bgConstant;

    const defaultStyle = {
      flex: 1,
      width: bgWidth,
      height: bgHeight,
      justifyContent: 'center',
      alignItems: 'center',
    };

    const imageSource = this.props.right
      ? 'navButtonBackgroundRight'
      : 'navButtonBackgroundLeft';

    return (
      <ImageBackground
        source={ImageService.getImage(imageSource)}
        style={Object.assign(defaultStyle, this.props.style)}>
        <CircleButton
          image={this.props.buttonImage}
          onPress={this.props.onPress}
        />
      </ImageBackground>
    );
  }
}
