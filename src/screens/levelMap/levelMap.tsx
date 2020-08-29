import React, {Component} from 'react';
import {View, Image, ImageBackground, Text} from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

// import Levels from '../../assets/levels.json';
import {getStyles} from './levelMap.style';
import NoNotchView from '../../components/noNotchView';
import ImageService from '../../services/imageService';
import MapLayer from '../../components/map/mapLayer';
import MapBackButton from '../../components/map/mapBackButton';
import CircleButton from '../../components/button/circleButton';

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

          <CircleButton
            image="backButton"
            style={this.styles.leftButtonOverlay}
            imageStyle={this.styles.topButtonImage}
            hide={this.props.mapNavigationMode}
            // onPress={}
          />

          <CircleButton
            image="mapButton"
            style={this.styles.rightButtonOverlay}
            imageStyle={this.styles.topButtonImage}
            hide={this.props.mapNavigationMode}
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

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.playButtonOverlay}>
              <TouchableScale
                style={this.styles.playButtonImage}
                onPress={() => {}}>
                <ImageBackground
                  source={ImageService.getImage('buttonYellow')}
                  style={this.styles.playButtonImage}
                  resizeMode="contain">
                  <Text style={this.styles.playButtonText}>TypeScript</Text>
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
