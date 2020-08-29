import React, {Component} from 'react';
import {View, Image, ImageBackground, Text} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import Levels from '../../assets/levels.json';
import {getStyles} from './levelMap.style';
import NoNotchView from '../../components/noNotchView';
import ImageService from '../../services/imageService';
import MapLayer from '../../components/map/mapLayer';

export default class LevelMap extends Component {
  state = {
    mapNavigationMode: false,
  };

  constructor() {
    super();
  }

  render() {
    this.styles = getStyles();

    return (
      <NoNotchView>
        <View style={this.styles.container}>
          <MapLayer />

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.leftButtonOverlay}>
              <TouchableScale
                style={this.styles.topButtonImage}
                onPress={() => {}}>
                <Image
                  source={ImageService.getImage('backButton')}
                  style={this.styles.topButtonImage}
                  resizeMode="contain"
                />
              </TouchableScale>
            </View>
          )}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.rightButtonOverlay}>
              <TouchableScale
                style={this.styles.topButtonImage}
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      mapNavigationMode: !this.state.mapNavigationMode,
                    });
                  }, 500);
                }}>
                <Image
                  source={ImageService.getImage('mapButton')}
                  style={this.styles.topButtonImage}
                  resizeMode="contain"
                />
              </TouchableScale>
            </View>
          )}

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

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.playButtonOverlay}>
              <TouchableScale
                style={this.styles.playButtonImage}
                onPress={() => {}}>
                <ImageBackground
                  source={ImageService.getImage('buttonYellow')}
                  style={this.styles.playButtonImage}
                  resizeMode="contain">
                  <Text style={this.styles.playButtonText}>Jugar</Text>
                </ImageBackground>
              </TouchableScale>
            </View>
          )}

          {this.state.mapNavigationMode ? (
            <View style={this.styles.closeMapButtonOverlay}>
              <TouchableScale
                style={this.styles.playButtonImage}
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      mapNavigationMode: !this.state.mapNavigationMode,
                    });
                  }, 500);
                }}>
                <ImageBackground
                  source={ImageService.getImage('buttonYellow')}
                  style={this.styles.playButtonImage}
                  resizeMode="contain">
                  <Text style={this.styles.playButtonText}>Tancar mapa</Text>
                </ImageBackground>
              </TouchableScale>
            </View>
          ) : null}
        </View>
      </NoNotchView>
    );
  }
}
