import React, {PureComponent} from 'react';
import DeviceInfo from 'react-native-device-info';
import {View, Platform} from 'react-native';

class NoNotchView extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    navbarHeight: 0,
    deviceHaveNotch: false,
  };

  componentDidMount = async () => {
    const deviceHaveNotch = await DeviceInfo.hasNotch();
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
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}>
          <View
            style={{
              flex: 1,
              marginTop: navbarHeight,
            }}>
            {this.props.children}
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
          }}>
          {this.props.children}
        </View>
      );
    }
  }
}

export default NoNotchView;
