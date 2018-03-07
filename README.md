# create-prop-types
A lightweight helper library to create custom React prop types.

## Getting started
### Install
```bash
npm install create-prop-types --save-dev
```

### Create a custom prop type
```js
// ./prop-types/Iterable.js

import createPropType from 'create-prop-types';
import { Iterable } from 'immutable';

const IterablePropType = createPropType({
  predicate: propValue => Iterable.isIterable(propValue)
});

export default IterablePropType;
```

### Use the custom prop type
```jsx
import Iterable from './prop-types/Iterable';

export default class MyComponent extends React.Component {
  static propTypes = {
    propA: Iterable,
    propB: Iterable.isRequired
  }
}
```

## API
### `predicate: (propValue: any) => boolean`
A predicate function to satisfy in order to consider the prop value as valid.

#### Example
```js
const CustomPropType = createPropType({
  predicate: propValue => (propValue !== 'foo')
});

export default CustomPropType;
```

### `warnings?: Warnings`
Optional custom warning messages.

```ts
type Warnings = {
  missing?: WarningResolver,
  invalid?: WarningResolver
}

type WarningResolver = (propName: string, propValue: any, componentName: string) => string
```

#### Example
```js
const CustomPropType = createPropType({
  predicate: propValue => ...,
  warnings: {
    missing: (propName, propValue, componentName) => {
      return `Required prop "${propName}" is missing in "${componentName}" component.`;
    }
  }
});

export default CustomPropType;
```

## License
This project is licensed under [MIT License](./LICENSE.md). See the license file for more details.
