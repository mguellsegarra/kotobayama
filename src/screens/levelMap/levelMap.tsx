import React, {Component} from 'react';
import {View, ImageBackground, Text} from 'react-native';

import {getStyles} from './levelMap.style';
import NoNotchView from '../../components/noNotchView';
import ImageService from '../../services/imageService';
import MapLayer from '../../components/map/mapLayer';
import RectButton, {RectButtonEnum} from '../../components/button/rectButton';
import MapNavButton, {
  MapNavButtonEnum,
} from '../../components/button/mapNavButton';

type State = {
  mapNavigationMode: boolean;
};

export default class LevelMap extends Component<State> {
  styles: any;

  state = {
    mapNavigationMode: false,
  };

  constructor(props: any) {
    super(props);
    this.styles = {};
  }

  render() {
    this.styles = getStyles();

    return (
      <NoNotchView>
        <View style={this.styles.container}>
          <MapLayer controlsEnabled={this.state.mapNavigationMode} />

          <MapNavButton
            type={MapNavButtonEnum.Back}
            style={this.styles.leftButtonOverlay}
            hide={this.state.mapNavigationMode}
          />

          <MapNavButton
            type={MapNavButtonEnum.Map}
            style={this.styles.rightButtonOverlay}
            hide={this.state.mapNavigationMode}
            right
            onPress={() => {
              setTimeout(() => {
                this.setState({
                  mapNavigationMode: !this.state.mapNavigationMode,
                });
              }, 500);
            }}
          />

          <RectButton
            hide={this.state.mapNavigationMode}
            type={RectButtonEnum.Yellow}
            text={'Jugar'}
            style={this.styles.playButtonOverlay}
          />

          <RectButton
            hide={!this.state.mapNavigationMode}
            type={RectButtonEnum.Yellow}
            text={'Tancar mapa'}
            style={this.styles.closeMapButtonOverlay}
            onPress={() => {
              setTimeout(() => {
                this.setState({
                  mapNavigationMode: !this.state.mapNavigationMode,
                });
              }, 500);
            }}
          />

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.titleOverlay}>
              <ImageBackground
                source={ImageService.getImage('mapTitleContainer')}
                style={this.styles.mapTitleContainerImage}
                resizeMode="contain">
                <Text style={this.styles.mapTitleText}>
                  Parc Nacional d'Aigüestortes i llac de Sant Maurici
                </Text>
              </ImageBackground>
            </View>
          )}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.bottomOverlay} />
          )}
        </View>
      </NoNotchView>
    );
  }
}
