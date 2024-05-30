import { useRef } from 'react';

/**
 * Continually store a value into useRef
 * 
 * Useful for passing callbacks into effects without reseting them
 * @param value ref.current value
 * @example
 * const valueRef = useConRef(value);
 */
export function useConRef<T = unknown>(value: T): React.MutableRefObject<T> {
	const ref = useRef(value);
	ref.current = value;
	return ref;
}

export default useConRef;
