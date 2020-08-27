import { useState, useEffect } from 'react';

/**
 * simple hook wrapper for async functions for 'on-mount / componentDidMount' that only need to fired once
 * @param asyncGetter async function that 'gets' something
 * @param initialResult -1 | false | 'unknown'
 */
export function useOnMount(asyncGetter, initialResult) {
  const [response, setResponse] = useState({
    loading: true,
    result: initialResult
  });
  useEffect(() => {
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