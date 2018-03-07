import React from 'react';
import { assert, expect } from 'chai';
import { Map } from 'immutable';
import createPropType from '../lib';

const MapPropType = createPropType({
  predicate: propValue => Map.isMap(propValue)
});

const Element = () => null;

describe('createPropType', function () {
  function assertPasses(validator, { props }, propName) {
    expect(validator(props, propName, '')).to.be.undefined;
  }

  function assertFails(validator, { props }, propName) {
    expect(validator.bind(this, props, propName, '')).to.throw(Error);
  }

  it('Returns valid prop type validator', () => {
    expect(MapPropType).to.be.an.instanceOf(Function);
    expect(MapPropType).to.have.property('isRequired');
    expect(MapPropType.isRequired).to.be.an.instanceOf(Function);
  });

  it('Optional prop is validated properly', () => {
    const validator = MapPropType;
    Element.propTypes = { prop: validator };

    assertPasses(validator, <Element />, 'prop');
    assertFails(validator, <Element prop={{ a: true }} />, 'prop');
    assertPasses(validator, <Element prop={Map()} />, 'prop');
  });

  it('Required prop is validated correctly', () => {
    const validator = MapPropType.isRequired;
    Element.propTypes = { prop: validator };

    assertFails(validator, <Element />, 'prop');
    assertFails(validator, <Element prop={{ a: true }} />, 'prop');
    assertPasses(validator, <Element prop={Map()} />, 'prop');
  });
});
