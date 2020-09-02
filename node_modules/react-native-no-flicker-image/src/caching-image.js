import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";

const cachedSources = new Set([]);

class CachingImage extends PureComponent {
  onSourceLoadedInCache = () => {
    const { source, onSourceLoaded } = this.props;
    if (!cachedSources.has(source)) {
      cachedSources.add(source);
      onSourceLoaded();
    }
  };

  componentDidUpdate() {
    const { source, onSourceLoaded } = this.props;
    if (cachedSources.has(source)) {
      onSourceLoaded();
    }
  }

  render() {
    return <Image {...this.props} onLoad={this.onSourceLoadedInCache} />;
  }
}

CachingImage.propTypes = {
  ...Image.propTypes,
  onSourceLoaded: PropTypes.func.isRequired,
};
CachingImage.defaultProps = {};

export { CachingImage };
