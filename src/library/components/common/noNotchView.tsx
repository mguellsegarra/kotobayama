import React, {PureComponent} from 'react';
import DeviceInfo from 'react-native-device-info';
import {View, Platform} from 'react-native';

class NoNotchView extends PureComponent {
  constructor(props: any) {
    super(props);
  }

  state = {
    navbarHeight: 0,
    deviceHaveNotch: false,
  };

  componentDidMount = async () => {
    const deviceHaveNotch = DeviceInfo.hasNotch();
    if (Platform.OS === 'ios' && deviceHaveNotch) {
      this.setState({
        navbarHeight: 44,
        deviceHaveNotch: true,
      });
    }
  };

  render() {
    const {navbarHeight, deviceHaveNotch} = this.state;

    if (deviceHaveNotch) {
      return (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              paddingTop: navbarHeight,
            }}>
            {this.props.children}
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            paddingTop: 0,
            flex: 1,
          }}>
          {this.props.children}
        </View>
      );
    }
  }
}

export default NoNotchView;
