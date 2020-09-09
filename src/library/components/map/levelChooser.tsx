import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
// @ts-ignore
import LinearGradient from 'react-native-linear-gradient';

import R, {Images, Colors} from '@res/R';
import {styles} from './levelChooser.style';
import CircleButton from '@library/components/button/circleButton';
import LevelIndexNumber from '../common/levelIndexNumber';

import PhotoFrame, {PhotoFrameSize} from '@library/components/photo/photoFrame';
import {observer, inject} from 'mobx-react';

import {Level} from '@library/models/level';
import LevelProgressStore, {
  getLevelProgress,
} from '@library/mobx/levelProgressStore';

type Props = {
  hide?: boolean;
  levels: Array<Level>;
  currentLevel: number;
  packId: string;
  onNextLevel: Function;
  onPrevLevel: Function;
  levelProgressStore?: LevelProgressStore;
};

@inject('levelProgressStore')
@observer
export default class LevelChooser extends Component<Props> {
  static defaultProps = {
    hide: false,
  };

  render() {
    if (this.props.hide) {
      return null;
    }

    const levelProgress = getLevelProgress(
      this.props.levelProgressStore!.levelsProgress,
      this.props.levels[this.props.currentLevel].id,
      this.props.packId,
    ).levelProgress;

    return (
      <View style={styles.container}>
        <View style={styles.levelBar}>
          <View style={styles.levelBarFlex}>
            <View style={styles.levelBarArrow}>
              <CircleButton
                delay={0}
                image={Images.left_arrow}
                onPress={this.props.onPrevLevel}
              />
            </View>
            <View style={styles.levelBarMiddle}>
              <LevelIndexNumber
                totalLevels={this.props.levels.length}
                currentLevel={this.props.currentLevel}
              />
            </View>
            <View style={styles.levelBarArrow}>
              <CircleButton
                delay={0}
                image={Images.right_arrow}
                onPress={this.props.onNextLevel}
              />
            </View>
          </View>
        </View>
        <LinearGradient
          colors={[Colors.purpleGradientStart, Colors.purpleGradientEnd]}
          style={styles.levelDetails}>
          <PhotoFrame
            size={PhotoFrameSize.small}
            style={styles.levelDetailsImage}
            level={this.props.levels[this.props.currentLevel]}
          />
          <View style={styles.levelDetailsRight}>
            <View style={styles.levelDetailsRightCell}>
              <Image
                style={styles.detailRightCellImage}
                source={R.img(Images.boot_icon_details)}
              />
              <Text style={styles.detailRightText}>Refugi</Text>
            </View>
            <View style={styles.levelDetailsRightCell}>
              <Image
                style={styles.detailRightCellImage}
                source={R.img(Images.letter_icon_details)}
              />
              <Text style={styles.detailRightText}>
                {this.props.levels[this.props.currentLevel].word.length} lletres
              </Text>
            </View>
            <View style={styles.levelDetailsRightCell}>
              <Image
                style={styles.detailRightCellImage}
                source={R.img(Images.heart_icon_details)}
              />
              <Text style={styles.detailRightText}>
                {levelProgress?.lives + '/3'}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
