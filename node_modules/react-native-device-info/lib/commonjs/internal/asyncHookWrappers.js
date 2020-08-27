"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOnMount = useOnMount;

var _react = require("react");

/**
 * simple hook wrapper for async functions for 'on-mount / componentDidMount' that only need to fired once
 * @param asyncGetter async function that 'gets' something
 * @param initialResult -1 | false | 'unknown'
 */
function useOnMount(asyncGetter, initialResult) {
  const [response, setResponse] = (0, _react.useState)({
    loading: true,
    result: initialResult
  });
  (0, _react.useEffect)(() => {
    // async function cuz react complains if useEffect's effect param is an async function
    const getAsync = async () => {
      const result = await asyncGetter();
      setResponse({
        loading: false,
        result
      });
    };

    getAsync();
  }, [asyncGetter]);
  return response;
}
//# sourceMappingURL=asyncHookWrappers.js.map