import React, {Component} from 'react';
import {Text, TextProps} from 'react-native';
import moment from 'moment';

type Props = {
  finishTime: number;
  format: string;
  textStyle?: TextProps;
  onFinish: Function;
  onUpdate: Function;
};

type State = {
  show: string;
  millisecondsLeft: number;
};

class CountdownText extends Component<Props, State> {
  left: NodeJS.Timeout | null;

  constructor(props: Props) {
    super(props);
    this.left = null;
    const msLeft = this.props.finishTime * 1000 - new Date().getTime();

    this.state = {
      millisecondsLeft: msLeft,
      show: moment.utc(msLeft).format(this.props.format),
    };
  }

  componentDidMount() {
    this.left = setInterval(() => {
      this.setState({
        millisecondsLeft: this.props.finishTime * 1000 - new Date().getTime(),
      });
      this.millisecondsToString();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.left!);
  }

  millisecondsToString = () => {
    const seconds =
      this.state.millisecondsLeft / 1000 -
      ((this.state.millisecondsLeft / 1000) % 1);
    const formatted = moment
      .utc(this.state.millisecondsLeft)
      .format(this.props.format);

    this.setState({
      show: moment.utc(this.state.millisecondsLeft).format(this.props.format),
    });

    if (seconds === 0) {
      this.props.onFinish();
    } else {
      if (formatted.split(':')[1] === '00') { // Every minute
        this.props.onUpdate(this.state.millisecondsLeft);
      }
    }
  };

  render() {
    return <Text style={this.props.textStyle}>{this.state.show}</Text>;
  }
}

export default CountdownText;
