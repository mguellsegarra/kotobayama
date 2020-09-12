import React, {Component} from 'react';
import {View, Image, Text, ImageBackground} from 'react-native';
import {styles} from './levelComplete.style';
import NoNotchView from '@library/components/common/noNotchView';
import PhotoFrame, {PhotoFrameSize} from '@library/components/photo/photoFrame';
import {strings} from '@library/services/i18nService';
import R, {Images} from '@res/R';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import {observer, inject} from 'mobx-react';
import LevelProgressStore, {
  getLevelProgress,
} from '@library/mobx/levelProgressStore';
import LevelMapStore from '@library/mobx/levelMapStore';
import UserStore from '@library/mobx/userStore';

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
  componentDidMount() {}

  render() {
    const {level, pack} = this.props.route.params;

    return (
      <View style={styles.background}>
        <NoNotchView>
          <View style={styles.container}>
            <View style={styles.ribbon}>
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
                  source={R.img(Images.star_completed)}
                  style={styles.starSmall}
                />
              </View>
              <View style={styles.secondStar}>
                <Image
                  source={R.img(Images.star_completed)}
                  style={styles.starBig}
                />
              </View>
              <View style={styles.thirdStar}>
                <Image
                  source={R.img(Images.star_completed_gray)}
                  style={styles.starSmall}
                />
              </View>
            </View>
            <View style={styles.photo}>
              <PhotoFrame size={PhotoFrameSize.big} level={level} />
              <Text style={styles.sourceText}>
                {strings('sourcePhoto')}: pirineosconninos.es
              </Text>
            </View>
            <View style={styles.info}>
              <View style={styles.infoTop}>
                <Text style={styles.titleText}>{level.title}</Text>
              </View>
              <View style={styles.infoMiddle}>
                <Text
                  numberOfLines={6}
                  adjustsFontSizeToFit
                  style={styles.descriptionText}>
                  El Refugi Joan Ventosa i Calvell és un refugi de muntanya
                  propietat del Centre Excursionista de Catalunya , situat dins
                  el municipi de la Vall de Boí (Alta Ribagorça), sobre l’Estany
                  Negre, en la cota 2.214, al peu de les Agulles de Travessani
                  en l'extrem oriental del Pletiu d'Estany Negre i dins dels
                  límits del Parc Nacional d'Aigüestortes i Estany de Sant
                  Maurici.
                </Text>
              </View>
              <View style={styles.infoBottom}>
                <View style={styles.wikipediaButton}>
                  <View style={styles.wikipediaImageContainer}>
                    <Image
                      source={R.img(Images.wikipedia_icon)}
                      style={styles.wikipediaImage}
                    />
                  </View>
                  <View style={styles.wikipediaLabel}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={0}
                      style={styles.wikipediaLabelText}>
                      {strings('readWikipedia')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rewards}></View>
            <View style={styles.buttons}>
              <RectButton
                type={RectButtonEnum.Green}
                text={strings('claim')}
                style={styles.buttonLeft}
                onPress={() => {
                  this.props.levelMapStore.nextIncompleteLevelForPack(
                    this.props.levelProgressStore.levelsProgress,
                    pack,
                  );

                  this.props.navigation.navigate('LevelMap');
                }}
              />
              <RectButton
                type={RectButtonEnum.Yellow}
                text={strings('claim') + ' x2'}
                style={styles.buttonRight}
                onPress={() => {
                  this.props.userStore.incrementCoinsForLives(
                    this.props.levelProgressStore?.getCurrentLives(
                      level.id,
                      pack.id,
                    ),
                  );

                  this.props.levelMapStore.nextIncompleteLevelForPack(
                    this.props.levelProgressStore.levelsProgress,
                    pack,
                  );

                  this.props.navigation.navigate('LevelMap');
                }}
              />
            </View>
          </View>
        </NoNotchView>
      </View>
    );
  }
}
