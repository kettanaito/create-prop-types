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
  missing: (propName, propValue, componentName) => `Prop \`${propName}\` marked as required in \`${componentName}\`, but its value is \`${propValue}\`.`,

  invalid: (propName, propValue, componentName) => `Invalid prop \`${propName}\` of type \`${typeof propValue}\` supplied to \`${componentName}\`.`
};

/**
 * Creates a prop type generator function based on the provided options.
 */
export default function createPropType(options: CreatorOptions) {
  const { predicate, warnings: customWarnings } = options;
  const warnings: Warnings = Object.assign({}, defaultWarnings, customWarnings);

  invariant(predicate, 'Invalid "predicate" option supplied to custom prop type creator. ' +
    'Expected a function, but got: %s', predicate);

  function generateValidator(isRequired: boolean = false) {
    return function (props: Object, propName: string, componentName: string): void {
      const propValue = props[propName];

      if ((typeof propValue === 'undefined') || (propValue === null)) {
        invariant(!isRequired, warnings.missing(propName, propValue, componentName));
        return;
      }

      invariant(predicate(propValue), warnings.invalid(propName, propValue, componentName));
      return;
    };
  };

  const propType: any = generateValidator();
  propType.isRequired = generateValidator(true);

  return propType;
}
