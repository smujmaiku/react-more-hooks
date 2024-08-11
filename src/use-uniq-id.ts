import { useState } from 'react';

let lastTime = 0;
let lastHash = 1;

/**
 * Produce a random unique id
 * 
 * Creating two at once will always be incremental
 */
export function makeUniqId(): string {
	const now = Date.now();

	// Ensure unique value is incrementing
	let hash = Math.floor(Math.random() * 1e12);
	if (lastTime === now) {
		hash = lastHash + 1;
	}

	lastTime = now;
	lastHash = hash;

	return [
		now.toString(36),
		hash.toString(36).padStart(8, '0'),
	].join('');
}

/**
 * Produce a random unique id
 * 
 * Creating two at once will always be incremental
 * @example
 * const id = useUniqId();
 */
export function useUniqId(): string {
	const [id] = useState(() => makeUniqId());
	return id;
}

export default useUniqId;
