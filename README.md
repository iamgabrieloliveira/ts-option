## TS Option

TS Option is a TypeScript library that provides an implementation of the Option type commonly found in functional programming languages. The Option type is a powerful tool for dealing with potentially absent values, allowing for more expressive and safer code.

### Installation
You can install TS Option via npm:

```bash
npm install ts-option
```

### Usage

**Importing**:

```ts
import { type Option, some, none, isSome, isNone, wrap, unwrap, unwrapOr, expect, match, find } from 'ts-option';
```
**Creating Options**:

You can create Some and None options using the provided constructors:

```ts
const someValue: Option<number> = some(42);
const noneValue: Option<number> = none;
```

**Wrapping Values**:
The wrap function allows you to convert a value into an Option, handling null and undefined cases:

```ts
const option: Option<string> = wrap('Hello'); // Some("Hello")
const noneOption: Option<string> = wrap(null); // None
```

**Unwrapping Options**:
You can safely extract the value from a Some option using unwrap, unwrapOr, or expect. These functions handle the None case gracefully:

```ts
const value: string = unwrap(option); // "Hello"
const fallbackValue: string = unwrapOr(noneOption, 'Fallback'); // "Fallback"
const expectedValue: string = expect(option, 'Value was expected'); // "Hello"
```

**Matching Options**:
The match function provides a powerful way to pattern match on options, executing different logic based on whether the option is Some or None:

```ts
const result = match(option, {
    some: (value) => `Value is ${value}`,
    none: () => 'No value provided',
}); // "Value is Hello"
```

**Finding Elements**:
The find function simplifies searching for elements in an array, returning an Option containing the found element or None if no matching element is found:

```ts
const numbers: number[] = [1, 2, 3, 4, 5];
const found: Option<number> = find(numbers, (num) => num > 3); // Some(4)
```

**Contributing**
TS Option is open-source, and contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on GitHub.

