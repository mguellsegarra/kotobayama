import { AsyncHookResult } from './types';
/**
 * simple hook wrapper for async functions for 'on-mount / componentDidMount' that only need to fired once
 * @param asyncGetter async function that 'gets' something
 * @param initialResult -1 | false | 'unknown'
 */
export declare function useOnMount<T>(asyncGetter: () => Promise<T>, initialResult: T): AsyncHookResult<T>;
