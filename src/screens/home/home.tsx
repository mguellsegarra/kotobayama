import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import {styles} from './home.style';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'rn-fetch-blob';

import LevelService from '@library/services/levelService';

import R, {Images} from '@res/R';
import LevelProgressStore from '@library/mobx/levelProgressStore';
import {observer, inject} from 'mobx-react';
import SyncService from '@library/services/syncService';

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
    SyncService.hydrateLevelsProgress(this.props.levelProgressStore).then(
      () => {
        setTimeout(() => {
          this.props.navigation.navigate('LevelMap', {
            packId: '1',
          });
        }, 500);
      },
    );

    // RNFetchBlob.fetch(
    //   'GET',
    //   'https://tegami-mountains-content.s3-eu-west-1.amazonaws.com/levels.json',
    // )
    //   .progress({count: 5}, (received, total) => {
    //     const progress = (received / total) * 100;
    //     this.setState({...this.state, downloadProgress: progress});
    //   })
    //   .then((res) => {
    //     let status = res.info().status;
    //     if (status == 200) {
    //       let json = res.json();
    //       LevelService.setLevelSource(json);
    //       setTimeout(() => {
    //         this.props.navigation.navigate('LevelMap');
    //       }, 2000);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }

  render() {
    return (
      <ImageBackground
        source={R.img(Images.mountain_bg)}
        style={styles.background}>
        <Progress.Bar
          progress={this.state.downloadProgress}
          width={200}
          color={'black'}
        />
      </ImageBackground>
    );
  }
}
