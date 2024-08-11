import { useEffect, useState } from 'react';

let prevTime = 0;
let prevIndex = 1;

/**
 * Produce a random unique id
 * 
 * Creating two at once will always be incremental
 */
export function makeUniqId(preface = ''): string {
	const now = Date.now();
	let index = Math.floor(Math.random() * 1e12);

	// Ensure unique value is incrementing
	if (prevTime < now) {
		prevTime = now;
	} else {
		index = prevIndex + 1;
	}

	prevIndex = index;

	return [
		preface,
		prevTime.toString(36),
		index.toString(36).padStart(8, '0'),
	].join('');
}

/**
 * Produce a random unique id
 * 
 * Creating two at once will always be incremental
 * @example
 * const id = useUniqId();
 */
export function useUniqId(preface = ''): string {
	const [id, setId] = useState(() => makeUniqId(preface));

	// Update id only if preface changes
	useEffect(() => () => {
		setId(makeUniqId(preface))
	}, [preface]);

	return id;
}

export default useUniqId;
