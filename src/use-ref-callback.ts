import { useState } from 'react';
import useConRef from './use-con-ref';

/**
 * Create a callback that doesn't ever change as a dependancy
 * 
 * Useful for passing callbacks into effects without reseting them
 * @param fn Callback function
 * @example
 * const callback = useRefCallback((a, b) => { return a + b });
 */
export function useRefCallback<A extends any[], R>(fn: (...args: A) => R): (...args: A) => R {
	const ref = useConRef(fn);
	const [callback] = useState(() => (...args: A): R => ref.current(...args));
	return callback;
}

export default useRefCallback;
