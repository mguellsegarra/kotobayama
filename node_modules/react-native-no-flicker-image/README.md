## react-native-no-flicker-image 

React native `Image` component without flicker
 on `android` devices when `source` is changed. 
 Show previous image until new one is loaded. Support all [Image](https://facebook.github.io/react-native/docs/image) props.

## Install
```
npm install react-native-no-flicker-image
```

## Usage

```
import { NoFlickerImage } from 'react-native-no-flicker-image';

export default class DisplayAnImage extends Component {
  render() {
    return (
      <View>
        <NoFlickerImage
          source={require('/react-native/img/favicon.png')}
        />
        <NoFlickerImage
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
      </View>
    );
  }
}
```
