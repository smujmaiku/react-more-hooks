import { useState, MutableRefObject } from 'react';
import useRefCallback from './use-ref-callback';

export interface MutableLooseRefObject<T> extends MutableRefObject<T> {
	refresh: () => void;
}

/**
 * Create a react ref that can be "re-stated" to trigger effects and other hooks
 * 
 * Useful for holding jwt credentails that may refresh or expire
 * @param initialValue useRef initialValue
 * @example
 * const authRef = useLooseRef(0);
 * authRef.refresh();
 */
export default function useLooseRef<T>(initialValue: T): MutableLooseRefObject<T> {
	const [ref, setRef] = useState<MutableLooseRefObject<T>>({
		current: initialValue,
		refresh: null!
	});

	ref.refresh = useRefCallback(() => {
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

	return ref;
}
