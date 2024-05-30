# React More Hooks

This is a collection of react hooks that are generally useful.

## Usage

### useConRef

Continually store a value into useRef.

Useful for passing callbacks into effects without reseting them.

```ts
const valueRef = useConRef(value);

useEffect(() => {
	setInterval(() => {
		console.log(valueRef.current);
	}, 1000);
}, [valueRef]);
```
