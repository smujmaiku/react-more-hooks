import { useState, MutableRefObject, useEffect, useRef } from 'react';
import useRefCallback from './use-ref-callback';

export interface MutableLooseRefObject<T> extends MutableRefObject<T> {
	refresh: () => void;
}

/**
 * Create a react ref that can be "re-stated" to trigger effects and other hooks
 * 
 * Useful for holding jwt credentails that may refresh or expire
 * @param initialValue useRef initialValue
 * @param deps If present, effect will only activate if the values in the list change
 * @example
 * const authRef = useLooseRef(0);
 * authRef.refresh();
 */
export function useLooseRef<T>(initialValue: T, deps = [] as React.DependencyList): MutableLooseRefObject<T> {
	const [ref, setRef] = useState<MutableLooseRefObject<T>>({
		current: initialValue,
		refresh: null!
	});

	const refresh = useRefCallback(() => {
		const newRef = { ...ref };

		Object.defineProperty(ref, "current", {
			get() {
				return newRef.current;
			},
			set(value: T) {
				newRef.current = value;
			},
		});

		setRef(newRef);
	});

	const firstRefresh = useRef(true);
	useEffect(() => {
		if (firstRefresh.current) {
			firstRefresh.current = false;
			return;
		}
		refresh();
	}, [refresh, ...deps])

	ref.refresh = refresh;
	return ref;
}

export default useLooseRef;
