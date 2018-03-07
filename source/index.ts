import util from 'util';
import invariant from 'invariant';

type WarningResolver = (propName: string, propValue: any, componentName: string) => string

type Warnings = {
  missing?: WarningResolver,
  invalid?: WarningResolver
}

type CreatorOptions = {
  predicate: (propValue: any) => boolean,
  warnings?: Warnings
}

const defaultWarnings: Warnings = {
  missing: (propName, propValue, componentName) => util.format(
    'Prop `%s` marked as required in `%s`, but its value is `%s`.',
    propName, componentName, propValue),

  invalid: (propName, propValue, componentName) => util.format(
    'Invalid prop `%s` of type `%s` supplied to `%s`.',
    propName, typeof propValue, componentName)
};

/**
 * Creates a prop type generator function based on the provided options.
 */
export default function createPropType(options: CreatorOptions) {
  const { predicate, warnings: customWarnings } = options;
  const warnings: Warnings = Object.assign({}, defaultWarnings, customWarnings);

  invariant(predicate, 'Invalid "predicate" option supplied to custom prop type creator. ' +
    'Expected a function, but got: %s', predicate);

  function createValidator(isRequired: boolean = false) {
    return function (props: Object, propName: string, componentName: string): void {
      const propValue = props[propName];

      if ((typeof propValue !== 'undefined') && (propValue !== null)) {
        invariant(!isRequired, warnings.missing(propName, propValue, componentName));

        return null;
      }

      invariant(predicate(propValue), warnings.invalid(propName, propValue, componentName));
    };
  };

  const propType: any = createValidator();
  propType.isRequired = createValidator(true);

  return propType;
}
