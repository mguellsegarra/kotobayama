import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'mobx-react';
import Bugsnag from '@bugsnag/react-native';

import LevelMap from '@screens/levelMap/levelMap';
import Splash from '@screens/splash/splash';
import Home from '@screens/home/home';
import Game from '@screens/game/game';
import LevelComplete from '@screens/game/levelComplete';
import NoLives from '@screens/game/noLives';
import AddCoins from '@screens/game/addCoins';

import stores from '@library/mobx/store';

const Stack = createStackNavigator();

const cardStyleInterpolator = (options: any) => {
  const {current} = options;
  const {progress} = current;
  return {
    cardStyle: {
      opacity: progress,
    },
    overlayStyle: {
      opacity: 0,
    },
  };
};
export default class App extends Component {
  componentDidMount() {
    if (!__DEV__) {
      Bugsnag.start();
    }
  }

  render() {
    return (
      <Provider {...stores}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            headerMode="none"
            mode="modal"
            screenOptions={{
              cardStyle: {backgroundColor: 'transparent'},
              cardOverlayEnabled: true,
              cardStyleInterpolator,
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="LevelMap"
              component={LevelMap}
              options={{
                animationEnabled: false,
              }}
            />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="LevelComplete" component={LevelComplete} />
            <Stack.Screen name="NoLives" component={NoLives} />
            <Stack.Screen name="AddCoins" component={AddCoins} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
