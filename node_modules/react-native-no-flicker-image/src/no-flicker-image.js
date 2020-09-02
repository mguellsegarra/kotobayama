import React, { PureComponent } from "react";
import { Image, StyleSheet, Platform } from "react-native";
import { CachingImage } from "./caching-image";


class NoFlickerImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
    };
  }

  onSourceLoaded = () => {
    if (this.state.source !== this.props.source) {
      this.setState({
        source: this.props.source,
      });
    }
  };

  render() {
    if (Platform.OS === "ios") {
      return (
        <Image {...this.props}/>
      );
    }

    return (
      <React.Fragment>
        <CachingImage
          {...this.props}
          style={styles.hide}
          onSourceLoaded={this.onSourceLoaded}
        />
        <Image
          {...this.props}
          source={this.state.source}
        />
      </React.Fragment>
    );
  }
}

NoFlickerImage.propTypes = {
  ...Image.propTypes
};

export { NoFlickerImage };

const styles = StyleSheet.create({
  hide: {
    display: "none",
  },
});
