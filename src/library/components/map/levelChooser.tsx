import React, {Component} from 'react';
import {View, ImageBackground, Image, Text} from 'react-native';

import R, {Images} from '@res/R';
import {getStyles} from './levelChooser.style';
import CircleButton from '@library/components/button/circleButton';
import LevelChooserNumber from './levelChooserNumber';
import {Level} from '@library/services/levelService';

type Props = {
  hide?: boolean;
  levels: Array<Level>;
  currentLevel: number;
  onNextLevel: Function;
  onPrevLevel: Function;
};

export default class LevelChooser extends Component<Props> {
  static defaultProps = {
    hide: false,
  };

  render() {
    const styles = getStyles();

    if (this.props.hide) {
      return null;
    }

    const pic = R.img('level_1000' + (this.props.currentLevel + 1).toString());

    return (
      <View
        style={styles.container}>
        <View style={styles.levelBar}>
          <View style={styles.levelBarFlex}>
            <View style={styles.levelBarArrow}>
              <CircleButton
                image="leftArrow"
                style={{flex: 1}}
                onPress={this.props.onPrevLevel}
              />
            </View>
            <View style={styles.levelBarMiddle}>
              <LevelChooserNumber
                totalLevels={this.props.levels.length}
                currentLevel={this.props.currentLevel}
              />
            </View>
            <View style={styles.levelBarArrow}>
              <CircleButton
                image="rightArrow"
                style={{flex: 1}}
                onPress={this.props.onNextLevel}
              />
            </View>
          </View>
        </View>
        <View style={styles.levelDetails}>
          <View style={styles.levelDetailsImage}>
            <Image
              resizeMode="cover"
              style={styles.levelDetailsImagePic}
              source={pic}
            />
            <Image
              resizeMode="cover"
              style={styles.levelDetailsImageFrame}
              source={R.img(Images.photo_frame)}
            />
          </View>
          <View style={styles.levelDetailsRight}>
            <View style={styles.levelDetailsRightCell}>
              <Image
                resizeMode="contain"
                style={styles.detailRightCellImage}
                source={R.img(Images.boot_icon_details)}
              />
              <Text style={styles.detailRightText}>Refugi</Text>
            </View>
            <View style={styles.levelDetailsRightCell}>
              <Image
                resizeMode="contain"
                style={styles.detailRightCellImage}
                source={R.img(Images.letter_icon_details)}
              />
              <Text style={styles.detailRightText}>
                {this.props.levels[this.props.currentLevel].word.length} lletres
              </Text>
            </View>
            <View style={styles.levelDetailsRightCell}>
              <Image
                resizeMode="contain"
                style={styles.detailRightCellImage}
                source={R.img(Images.heart_icon_details)}
              />
              <Text style={styles.detailRightText}>3/3</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
