import React, {Component} from 'react';

import {getStyles} from './game.style';
import NoNotchView from 'src/library/components/noNotchView';

type Props = {};
type State = {};

export default class LevelMap extends Component<Props, State> {
  styles: any;
  mapLayer: any;

  state = {};

  constructor(props: Props) {
    super(props);
    this.styles = {};
  }

  render() {
    this.styles = getStyles();

    return <NoNotchView></NoNotchView>;
  }
}
