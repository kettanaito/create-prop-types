# create-prop-types
A lightweight helper library to create custom React prop types validators for your applications.

## Getting started
### Install
```bash
npm install create-prop-types --save-dev
```

### Import
```js
import createPropType from 'create-prop-types';
```

### Create a custom prop type
```js
// ./prop-types/Iterable.js

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