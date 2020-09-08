import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'mobx-react';

import LevelMap from '@screens/levelMap/levelMap';
import Splash from '@screens/splash/splash';
import Home from '@screens/home/home';
import Game from '@screens/game/game';

import stores from '@library/mobx/store';

const Stack = createStackNavigator();

const App = () => {
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
};

export default App;
