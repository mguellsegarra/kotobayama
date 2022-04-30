import React, {Component} from 'react';
import {Text, ImageBackground, TouchableOpacity, Linking} from 'react-native';
import {View, Image} from 'react-native-animatable';

import {styles} from './levelComplete.style';
import NoNotchView from '@library/components/common/noNotchView';
import PhotoFrame, {PhotoFrameSize} from '@library/components/photo/photoFrame';
import {strings} from '@library/services/i18nService';
import R, {Images} from '@res/R';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';

import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';

import RectButtonWatchAdd from '@library/components/button/rectButtonWatchAd';
import {observer, inject} from 'mobx-react';
import {getLevelProgress} from '@library/helpers/levelHelper';

import LevelProgressStore from '@library/mobx/levelProgressStore';
import LevelMapStore from '@library/mobx/levelMapStore';
import UserStore from '@library/mobx/userStore';
import {LevelProgress} from '@library/models/level';
import delayPromise from '@library/utils/delayPromise';

// @ts-ignore
import Confetti from 'react-native-confetti';

const kImagesForStars: any = {
  1: [
    Images.star_completed,
    Images.star_completed_gray,
    Images.star_completed_gray,
  ],
  2: [Images.star_completed, Images.star_completed, Images.star_completed_gray],
  3: [Images.star_completed, Images.star_completed, Images.star_completed],
};

type Props = {
  navigation: any;
  route: any;
  levelProgressStore: LevelProgressStore;
  levelMapStore: LevelMapStore;
  userStore: UserStore;
};

@inject('levelProgressStore')
@inject('levelMapStore')
@inject('userStore')
@observer
export default class LevelComplete extends Component<Props> {
  ribbonView: any;
  firstStar: any;
  secondStar: any;
  thirdStar: any;
  wikipediaButtonView: any;
  wikipediaExcerptView: any;
  rewardsView: any;
  buttonsView: any;
  starflareView: any;
  confettiView: any;

  constructor(props: Props) {
    super(props);
    this.handleClaim = this.handleClaim.bind(this);
    this.handleClaimx2 = this.handleClaimx2.bind(this);
    this.handleWikipediaLink = this.handleWikipediaLink.bind(this);
  }

  async componentDidMount() {
    this.starflareView.animate('fadeIn', 4000);
    await delayPromise(400);
    this.ribbonView.animate('fadeIn', 300);
    await delayPromise(400);
    if (this.confettiView) {
      this.confettiView.startConfetti();
    }
    this.firstStar.animate('fadeIn', 300);
    await delayPromise(400);
    this.secondStar.animate('fadeIn', 300);
    await delayPromise(400);
    this.thirdStar.animate('fadeIn', 300);
    await delayPromise(400);
    this.wikipediaButtonView.animate('fadeIn', 300);
    this.wikipediaExcerptView.animate('fadeIn', 300);
    await delayPromise(400);
    this.rewardsView.animate('fadeIn', 300);
    this.buttonsView.animate('fadeIn', 300);
  }

  handleClaim(pack: Pack, levelProgress: LevelProgress) {
    const coins = this.props.userStore.getCoinsToAddForLives(levelProgress!);

    this.props.levelMapStore.nextIncompleteLevelForPack(
      this.props.levelProgressStore.levelsProgress,
      pack,
    );

    this.props.navigation.navigate('LevelMap');
    this.props.userStore.incrementCoins(coins);
  }

  handleClaimx2(pack: Pack, levelProgress: LevelProgress) {
    const coins =
      this.props.userStore.getCoinsToAddForLives(levelProgress!) * 2;
    this.props.userStore.incrementCoins(coins);

    this.props.levelMapStore.nextIncompleteLevelForPack(
      this.props.levelProgressStore.levelsProgress,
      pack,
    );

    this.props.navigation.navigate('LevelMap');
  }

  async handleWikipediaLink(level: Level) {
    const supported = await Linking.canOpenURL(level.wikipediaLink);
    if (!supported) return;
    await Linking.openURL(level.wikipediaLink);
  }

  render() {
    const {level, pack} = this.props.route.params;
    const levelProgress = getLevelProgress(
      this.props.levelProgressStore.levelsProgress,
      level.id,
      pack.id,
    ).levelProgress;
    const coins = this.props.userStore.getCoinsToAddForLives(levelProgress!);
    const imagesForStars = kImagesForStars[levelProgress?.stars!];

    return (
      <View style={styles.background}>
        <View style={styles.confettiView} pointerEvents="none">
          <Confetti
            confettiCount={40}
            duration={2000}
            ref={(ref: any) => {
              this.confettiView = ref;
            }}
          />
        </View>
        <NoNotchView>
          <View style={styles.container}>
            <View
              style={[styles.ribbon, {opacity: 0}]}
              useNativeDriver
              ref={(ref) => {
                this.ribbonView = ref;
              }}>
              <ImageBackground
                source={R.img(Images.ribbon_level_complete)}
                style={styles.ribbonImage}>
                <Text style={styles.ribbonText}>
                  {strings('levelComplete').toUpperCase()}
                </Text>
              </ImageBackground>
            </View>
            <View style={styles.stars}>
              <View style={styles.firstStar}>
                <Image
                  source={R.img(imagesForStars[0])}
                  style={[styles.starSmall, {opacity: 0}]}
                  useNativeDriver
                  ref={(ref) => {
                    this.firstStar = ref;
                  }}
                />
              </View>
              <View style={styles.secondStar}>
                <Image
                  source={R.img(imagesForStars[1])}
                  style={[styles.starBig, {opacity: 0}]}
                  useNativeDriver
                  ref={(ref) => {
                    this.secondStar = ref;
                  }}
                />
              </View>
              <View style={styles.thirdStar}>
                <Image
                  source={R.img(imagesForStars[2])}
                  style={[styles.starSmall, {opacity: 0}]}
                  useNativeDriver
                  ref={(ref) => {
                    this.thirdStar = ref;
                  }}
                />
              </View>
            </View>
            <View style={styles.photo}>
              <PhotoFrame size={PhotoFrameSize.big} level={level} />
              <Text style={styles.sourceText}>
                {strings('sourcePhoto') + ': ' + level.sourcePhoto}
              </Text>
            </View>
            <View style={styles.info}>
              <View style={styles.infoTop}>
                <Text style={styles.titleText}>{level.title}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.handleWikipediaLink(level);
                }}>
                <View
                  style={[styles.wikipediaButton, {opacity: 0}]}
                  useNativeDriver
                  ref={(ref) => {
                    this.wikipediaButtonView = ref;
                  }}>
                  <View style={styles.wikipediaImageContainer}>
                    <Image
                      source={R.img(Images.wikipedia_icon)}
                      style={styles.wikipediaImage}
                    />
                  </View>
                  <View style={styles.wikipediaLabel}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={styles.wikipediaLabelText}>
                      {strings('readWikipedia')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={[styles.infoMiddle, {opacity: 0}]}
                useNativeDriver
                ref={(ref) => {
                  this.wikipediaExcerptView = ref;
                }}>
                <Text
                  numberOfLines={6}
                  adjustsFontSizeToFit
                  style={styles.descriptionText}>
                  {level.wikipediaExcerpt}
                </Text>
              </View>
            </View>
            <View
              style={[styles.rewards, {opacity: 0}]}
              useNativeDriver
              ref={(ref) => {
                this.rewardsView = ref;
              }}>
              <View style={styles.rewardsTop}>
                <ImageBackground
                  source={R.img(Images.reward_separator)}
                  style={styles.rewardsTopImage}>
                  <View style={styles.rewardsTopImageContainer}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={styles.rewardsTopImageText}>
                      {strings('rewards').toUpperCase()}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.rewardsBottom}>
                <Image
                  source={R.img(Images.coin_reward)}
                  style={styles.rewardsBottomImage}
                />
                <Text style={styles.rewardsBottomText}>{coins}</Text>
              </View>
            </View>
            <View
              style={[styles.buttons, {opacity: 0}]}
              useNativeDriver
              ref={(ref) => {
                this.buttonsView = ref;
              }}>
              <RectButton
                type={RectButtonEnum.Green}
                text={strings('claim')}
                style={styles.buttonLeft}
                onPress={() => {
                  this.handleClaim(pack, levelProgress!);
                }}
              />
              <RectButtonWatchAdd
                text={strings('claim') + ' x2'}
                style={styles.buttonRight}
                onPress={() => {
                  this.handleClaimx2(pack, levelProgress!);
                }}
              />
            </View>
            <View style={styles.bottomGap}></View>
          </View>
        </NoNotchView>
        <View
          style={[styles.starFlare, {opacity: 0}]}
          useNativeDriver
          ref={(ref) => {
            this.starflareView = ref;
          }}>
          <Image
            source={R.img(Images.reward_stars_shadow)}
            style={styles.starFlareImage}
          />
        </View>
      </View>
    );
  }
}
