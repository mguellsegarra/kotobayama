import React, {PureComponent} from 'react';
import {isIosAndNotch} from '@library/services/deviceService';
import {View, Platform, SafeAreaView} from 'react-native';

class NoNotchView extends PureComponent {
  constructor(props: any) {
    super(props);
  }

  state = {
    navbarHeight: 0,
    deviceHaveNotch: false,
  };

  componentDidMount = async () => {
    if (isIosAndNotch) {
      this.setState({
        navbarHeight: 44,
        deviceHaveNotch: true,
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          {this.props.children}
        </SafeAreaView>
      </View>
    );
  }
}

export default NoNotchView;
