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

import stores from '@library/mobx/store';

const Stack = createStackNavigator();

export default class App extends Component {
  componentDidMount() {
    Bugsnag.start();
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
              cardStyleInterpolator: ({current: {progress}}) => ({
                cardStyle: {
                  opacity: progress,
                },
                overlayStyle: {
                  opacity: progress,
                },
              }),
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="LevelMap"
              component={LevelMap}
              options={{
                animationEnabled: false,
                cardStyle: {backgroundColor: 'black'},
              }}
            />
            <Stack.Screen name="Game" component={Game} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
