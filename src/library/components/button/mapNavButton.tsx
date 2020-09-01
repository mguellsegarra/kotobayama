import React, {Component} from 'react';
import {ViewStyle, ImageBackground, Text} from 'react-native';
import {getStyles} from './mapNavButton.style';
import {strings} from '../../services/i18nService';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import R from '@res/R';
import CircleButton from './circleButton';

type Props = {
  hide?: boolean;
  onPress?: Function;
  type: MapNavButtonEnum;
  style?: ViewStyle;
  right?: boolean;
};

interface MapNavButtonType {
  image: string;
  textKey: string;
}

interface MapNavButtonTypeConfig {
  [index: string]: MapNavButtonType;
}

export enum MapNavButtonEnum {
  Back = 'back',
  Map = 'map',
}

const mapNavButtonTypes: MapNavButtonTypeConfig = {
  back: {
    image: 'mapNavBackButton',
    textKey: 'back',
  },
  map: {
    image: 'mapButton',
    textKey: 'exploreMap',
  },
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

    const styles = getStyles();
    const typeForButton = mapNavButtonTypes[this.props.type];
    const type = !typeForButton ? 'back' : this.props.type;
    const imageForType = mapNavButtonTypes[type].image;
    const textForType = strings(mapNavButtonTypes[type].textKey);

    const bgWidth = hp('11%');
    const bgConstant = 0.897058823529412;
    const bgHeight = bgWidth * bgConstant;
    const sideMarginConstant = 0.1;
    const sideMargin = bgWidth * sideMarginConstant;

    const sideMarginStyle = this.props.right
      ? {paddingLeft: sideMargin}
      : {paddingRight: sideMargin};

    const defaultStyle = {
      flex: 1,
      width: bgWidth,
      height: bgHeight,
      justifyContent: 'center',
      alignItems: 'center',
      ...sideMarginStyle,
    };

    const imageSource = this.props.right
      ? 'navButtonBackgroundRight'
      : 'navButtonBackgroundLeft';

    return (
      <ImageBackground
        source={R.images[imageSource]}
        style={Object.assign(defaultStyle, this.props.style)}>
        <CircleButton image={imageForType} onPress={this.props.onPress} />
        <Text style={styles.buttonText}>{textForType}</Text>
      </ImageBackground>
    );
  }
}
