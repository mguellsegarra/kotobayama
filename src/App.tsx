import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Animated, Easing} from 'react-native';
import LevelMap from '@screens/levelMap/levelMap';
import Splash from '@screens/splash/splash';
import Game from '@screens/game/game';

const Stack = createStackNavigator();

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps: any) => {
      const {position, layout, scene, index, scenes} = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0],
      });

      // Since we want the card to take the same amount of time
      // to animate downwards no matter if it's 3rd on the stack
      // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0],
      });

      const slideFromRight = {transform: [{translateX}]};
      const slideFromBottom = {transform: [{translateY}]};

      const lastSceneIndex = scenes[scenes.length - 1].index;

      // Test whether we're skipping back more than one screen
      if (lastSceneIndex - toIndex > 1) {
        // Do not transoform the screen being navigated to
        if (scene.index === toIndex) return;
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) return {opacity: 0};
        // Slide top screen down
        return slideFromBottom;
      }

      return slideFromRight;
    },
  };
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        headerMode="none"
        transitionConfig={transitionConfig}>
        <Stack.Screen name="Splash" component={Splash} />
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
  );
};

export default App;
