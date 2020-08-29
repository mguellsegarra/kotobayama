import React from 'react';

import {getStyles} from './mapBackButton.style';
import CircleButton from '../button/circleButton';

type Props = {
  hide?: boolean;
  onPress?: Function;
};

const MapBackButton = (props: Props) => {
  const styles = getStyles();

  return (
    <CircleButton
      image="backButton"
      style={styles.leftButtonOverlay}
      imageStyle={styles.topButtonImage}
      hide={props.hide}
      onPress={props.onPress}
    />
  );
};

export default MapBackButton;
