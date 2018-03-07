import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Map } from 'immutable';
import createPropType from '../lib';

const MapPropType = createPropType({
  predicate: propValue => Map.isMap(propValue)
});

class MyComponent extends React.Component {
  render() {
    return null;
  }
}

MyComponent.propTypes = {
  propA: MapPropType,
  propB: MapPropType.isRequired
};

describe('createPropType', function () {
  it('Returns valid prop type validator', () => {
    expect(MapPropType).to.be.an.instanceOf(Function);
    expect(MapPropType).to.have.property('isRequired');
    expect(MapPropType.isRequired).to.be.an.instanceOf(Function);
  });

  it('Optional prop is validated properly', () => {
    const missingProp = mount.bind(this, <MyComponent propB={Map()} />);
    expect(missingProp).not.to.throw;

    const invalidProp = mount.bind(this, <MyComponent propA={{ a: true }} propB={Map()} />);
    expect(invalidProp).to.throw;

    const validProp = mount.bind(this, <MyComponent propA={Map()} propB={Map()} />);
    expect(validProp).not.to.throw;
  });

  it('Required prop is validated correctly', () => {
    const missingProp = mount.bind(this, <MyComponent />);
    expect(missingProp).to.throw;

    const invalidProp = mount.bind(this, <MyComponent propB={{ a: true }} />);
    expect(invalidProp).to.throw;

    const validProp = mount.bind(this, <MyComponent propB={Map()} />);
    expect(validProp).not.to.throw;
  });
});
