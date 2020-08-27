/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LevelMap from './screens/levelMap/levelMap';
import Splash from './screens/splash/splash';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="LevelMap"
          component={LevelMap}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
