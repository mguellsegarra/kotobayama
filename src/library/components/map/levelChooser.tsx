import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {View} from 'react-native-animatable';

// @ts-ignore
import LinearGradient from 'react-native-linear-gradient';

const poiTypes = require('@assets/poiTypes');

import R, {Images, Colors} from '@res/R';
import {styles} from './levelChooser.style';
import CircleButton from '@library/components/button/circleButton';
import LevelIndexNumber from '../common/levelIndexNumber';
import {strings} from '@library/services/i18nService';

import PhotoFrame, {PhotoFrameSize} from '@library/components/photo/photoFrame';
import {observer, inject} from 'mobx-react';

import {Level, LevelProgress} from '@library/models/level';
import {getLevelProgress} from '@library/helpers/levelHelper';

import LevelProgressStore from '@library/mobx/levelProgressStore';

type Props = {
  levels: Array<Level>;
  currentLevel: number;
  packId: string;
  onNextLevel: Function;
  onPrevLevel: Function;
  levelProgressStore?: LevelProgressStore;
  pointerEvents: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
};

@inject('levelProgressStore')
@observer
export default class LevelChooser extends Component<Props> {
  containerView: any;

  static defaultProps = {
    hide: false,
  };

  completedLevel() {
    return (
      <LinearGradient
        colors={[Colors.purpleGradientStart, Colors.purpleGradientEnd]}
        style={styles.levelDetailsComplete}>
        <PhotoFrame
          size={PhotoFrameSize.small}
          level={this.props.levels[this.props.currentLevel]}
        />
        <Text style={styles.sourceText}>
          {strings('sourcePhoto') +
            ': ' +
            this.props.levels[this.props.currentLevel].sourcePhoto}
        </Text>
      </LinearGradient>
    );
  }

  incompleteLevel(levelProgress: LevelProgress) {
    const level = this.props.levels[this.props.currentLevel];

    return (
      <LinearGradient
        colors={[Colors.purpleGradientStart, Colors.purpleGradientEnd]}
        style={styles.levelDetailsIncomplete}>
        <View style={styles.levelDetailsImage}>
          <PhotoFrame
            size={PhotoFrameSize.small}
            level={this.props.levels[this.props.currentLevel]}
          />
          <Text style={styles.sourceText}>
            {strings('sourcePhoto') +
              ': ' +
              this.props.levels[this.props.currentLevel].sourcePhoto}
          </Text>
        </View>
        <View style={styles.levelDetailsRight}>
          <View style={styles.levelDetailsRightCell}>
            <Image
              style={styles.detailRightCellImage}
              source={R.img(poiTypes[level.type].image)}
            />
            <Text style={styles.detailRightText}>
              {strings(poiTypes[level.type].label)}
            </Text>
          </View>
          <View style={styles.levelDetailsRightCell}>
            <Image
              style={styles.detailRightCellImage}
              source={R.img(Images.letter_icon_details)}
            />
            <Text style={styles.detailRightText}>
              {this.props.levels[this.props.currentLevel].word.length}{' '}
              {strings('letters')}
            </Text>
          </View>
          <View style={styles.levelDetailsRightCell}>
            <Image
              style={styles.detailRightCellImage}
              source={R.img(Images.heart_icon_details)}
            />
            <Text style={styles.detailRightText}>
              {this.props.levelProgressStore?.getCurrentLives(
                levelProgress?.id,
                this.props.packId,
              )}
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  }

  animate(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  render() {
    const levelProgress = getLevelProgress(
      this.props.levelProgressStore!.levelsProgress,
      this.props.levels[this.props.currentLevel].id,
      this.props.packId,
    ).levelProgress;

    return (
      <View
        useNativeDriver
        ref={(ref) => {
          this.containerView = ref;
        }}
        pointerEvents={this.props.pointerEvents}
        style={styles.container}>
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
        {levelProgress?.completed
          ? this.completedLevel()
          : this.incompleteLevel(levelProgress!)}
      </View>
    );
  }
}
