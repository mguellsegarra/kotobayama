import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CachedImage from 'react-native-image-cache-wrapper';

type Props = {
  source: any;
  style: any;
  resizeMode?: any;
  children?: any;
  showNativeIndicator: boolean;
};

const styles = StyleSheet.create({
  loadingActivityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default class RemoteImage extends Component<Props> {
  render() {
    return (
      <View style={this.props.style}>
        <CachedImage
          resizeMode={this.props.resizeMode}
          style={{...this.props.style, zIndex: 5}}
          source={this.props.source}
          children={this.props.children}
          activityIndicator={
            this.props.showNativeIndicator ? (
              <ActivityIndicator
                animating={true}
                color="#999999"
                size={'large'}
              />
            ) : null
          }
        />
        <View style={{...this.props.style, backgroundColor: '#00000099'}}>
          <View style={styles.loadingActivityContainer}>
            <ActivityIndicator size="large" color="#999999" />
          </View>
        </View>
      </View>
    );
  }
}
