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

### useLooseRef

Create a react ref that can be "re-stated" to trigger effects and other hooks.

Useful for holding jwt credentails that may refresh or expire.

```ts
const authRef = useLooseRef(0);
// ...
authRef.refresh();
```

### useRefCallback

Create a callback that doesn't ever change as a dependancy

Useful for passing callbacks into effects without reseting them

```ts
const callback = useRefCallback((a, b) => { return a + b });

useEffect(()=>{
	console.log(callback(1, 2));
}, [callback])
```
