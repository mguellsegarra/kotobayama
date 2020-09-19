import React, {Component} from 'react';
import {View, ViewStyle} from 'react-native';
// @ts-ignore
import {NoFlickerImage} from 'react-native-no-flicker-image';
import {Level} from '@library/models/level';
import {isAndroid} from '@library/services/deviceService';

import R, {Images} from '@res/R';
import {styles} from './photoFrame.style';

import {wp, hp, isTablet} from '@library/services/deviceService';

type Props = {
  level: Level;
  style?: ViewStyle;
  size: PhotoFrameSize;
};

export enum PhotoFrameSize {
  small,
  big,
}

const photoFrameConstant = 0.626373626373626;
const photoFramePicResizeConstant = 0.98;

export default class PhotoFrame extends Component<Props> {
  photoFrameWidth: number;
  photoFrameHeight: number;

  constructor(props: Props) {
    super(props);

    if (this.props.size === PhotoFrameSize.small) {
      this.photoFrameWidth = isTablet() ? hp('35%') : wp('68%');
    } else {
      this.photoFrameWidth = isTablet()
        ? wp('70%')
        : isAndroid
        ? wp('75%')
        : wp('85%');
    }
    this.photoFrameHeight = this.photoFrameWidth * photoFrameConstant;
  }

  render() {
    const pic = R.img('level_' + this.props.level.id.toString());

    return (
      <View style={this.props.style}>
        <NoFlickerImage
          style={Object.assign(
            {
              width: this.photoFrameWidth * photoFramePicResizeConstant,
              height: this.photoFrameHeight * photoFramePicResizeConstant,
            },
            styles.levelDetailsImagePic,
          )}
          source={pic}
        />
      </View>
    );
  }
}
