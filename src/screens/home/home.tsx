import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import {styles} from './home.style';
import * as Progress from 'react-native-progress';

import R, {Images} from '@res/R';
import LevelProgressStore from '@library/mobx/levelProgressStore';
import {observer, inject} from 'mobx-react';
import SyncService from '@library/services/syncService';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';

type Props = {
  navigation: any;
  levelProgressStore: LevelProgressStore;
};

type State = {
  downloadProgress: number;
};

@inject('levelProgressStore')
@observer
export default class Splash extends Component<Props, State> {
  styles: any;
  state = {
    downloadProgress: 0,
  };

  componentDidMount() {
    SyncService.hydrateLevelsProgress(
      this.props.levelProgressStore,
      (progress: number) => {
        this.setState({...this.state, downloadProgress: progress});
      },
    ).then(() => {
      setTimeout(() => {
        this.props.navigation.navigate('LevelMap', {
          packId: '1',
        });
      }, 500);
    });
  }

  render() {
    return (
      <ImageBackground
        source={R.img(Images.mountain_bg)}
        style={styles.background}>
        <Progress.Bar
          progress={this.state.downloadProgress}
          width={isTablet() ? wp('40%') : wp('70%')}
          color={'black'}
        />
      </ImageBackground>
    );
  }
}
