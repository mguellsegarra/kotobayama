import React, {Component} from 'react';
import {Text} from 'react-native';

import {styles} from './coinCounter.style';

type Props = {
  coins: number;
};

type State = {
  currentCoins: number;
};

export default class CoinCounterText extends Component<Props, State> {
  left: NodeJS.Timeout | null;

  constructor(props: Props) {
    super(props);
    this.state = {currentCoins: this.props.coins};
    this.left = null;
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.left = setInterval(() => {
      if (this.state.currentCoins === this.props.coins) {
        clearInterval(this.left!);
        return;
      }

      this.setState({
        currentCoins:
          this.state.currentCoins +
          (this.state.currentCoins > this.props.coins ? -1 : +1),
      });
    }, 10);
  }

  render() {
    return (
      <Text adjustsFontSizeToFit style={styles.text}>
        {this.state.currentCoins}
      </Text>
    );
  }

  componentWillUnmount() {
    clearInterval(this.left!);
  }
}
