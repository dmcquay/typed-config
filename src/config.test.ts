import { expect } from 'chai';

import typedConfig, { INumberOptions } from './config';

describe('#getString', () => {
  context('when value is defined', () => {
    it('should return the value as a string', () => {
      const env = { FOO: 'bar' };
      expect(typedConfig(env).getString('FOO')).to.equal('bar');
    });
  });

  context('when value is not defined', () => {
    it('should throw with a useful error', () => {
      const env = {};
      expect(() => typedConfig(env).getString('FOO')).to.throw(Error, `Invalid configuration: FOO is undefined`);
    });
  });

  context('when value is does not match provided regex', () => {
    it('should throw with a useful error', () => {
      const env = { FOO: 'bar' };
      expect(() => typedConfig(env).getString('FOO', { pattern: /^notbar$/ })).to.throw(
        Error,
        `Invalid configuration: value 'bar' for key 'FOO' does not match pattern /^notbar$/`,
      );
    });
  });
});

describe('#getNumber', () => {
  context('when value is defined', () => {
    it('should return the value as a number', () => {
      const env = { FOO: '6.1' };
      expect(typedConfig(env).getNumber('FOO')).to.equal(6.1);
    });
  });

  context('when value is not defined', () => {
    it('should throw with a useful error', () => {
      const env = {};
      expect(() => typedConfig(env).getNumber('FOO')).to.throw(Error, `Invalid configuration: FOO is undefined`);
    });
  });

  context('when value is not a number', () => {
    it('should throw with a useful error', () => {
      const env = { FOO: 'asdf' };
      expect(() => typedConfig(env).getNumber('FOO')).to.throw(Error, `Invalid configuration: FOO is not a number`);
    });
  });

  context('when max value is provided and exceeded', () => {
    it('should throw with a useful error', () => {
      const env = { FOO: '9.1' };
      const opts: INumberOptions = { maxValue: 9 };
      expect(() => typedConfig(env).getNumber('FOO', opts)).to.throw(
        Error,
        `Invalid configuration: value '9.1' for key 'FOO' is larger than max value of 9`,
      );
    });
  });

  context('when max value is provided, but not exceeded', () => {
    it('should return the value as a number', () => {
      const env = { FOO: '9' };
      const opts: INumberOptions = { maxValue: 9 };
      expect(typedConfig(env).getNumber('FOO', opts)).to.equal(9);
    });
  });

  context('when min value is provided and the value is less than it', () => {
    it('should throw with a useful error', () => {
      const env = { FOO: '8.9' };
      const opts: INumberOptions = { minValue: 9 };
      expect(() => typedConfig(env).getNumber('FOO', opts)).to.throw(
        Error,
        `Invalid configuration: value '8.9' for key 'FOO' is less than min value of 9`,
      );
    });
  });

  context('when min value is provided, but the value is not less than it', () => {
    it('should return the value as a number', () => {
      const env = { FOO: '9' };
      const opts: INumberOptions = { minValue: 9 };
      expect(typedConfig(env).getNumber('FOO', opts)).to.equal(9);
    });
  });
});

describe('#getInteger', () => {
  // NOTE: since it just calls getNumber, I'm only testing the transform that it does with the result
  context('when value is a decimal', () => {
    it('should truncate to an integer', () => {
      const env = { FOO: '6.1' };
      expect(typedConfig(env).getInteger('FOO')).to.equal(6);
    });
  });

  context('when NumberOptions are passed', () => {
    it('they work just like with getNumber', () => {
      const env = { FOO: '6.1' };
      const opts = { minValue: 1, maxValue: 10 };
      expect(typedConfig(env).getInteger('FOO', opts)).to.equal(6);
    });
  });
});

describe('#getBool', () => {
  context('when set to "true"', () => {
    it('should return true', () => {
      const env = { FOO: 'true' };
      expect(typedConfig(env).getBoolean('FOO')).to.equal(true);
    });
  });

  context('when set to "false"', () => {
    it('should return false', () => {
      const env = { FOO: 'false' };
      expect(typedConfig(env).getBoolean('FOO')).to.equal(false);
    });
  });

  context('when undefined and no default provided', () => {
    it('should throw with a useful error', () => {
      const env = {};
      expect(() => typedConfig(env).getBoolean('FOO')).to.throw(
        Error,
        `Invalid configuration: FOO must be 'true' or 'false' not undefined`,
      );
    });
  });

  context('when undefined and default provided', () => {
    it('should return the default', () => {
      const env = {};
      expect(typedConfig(env).getBoolean('FOO', false)).to.be.false;
      expect(typedConfig(env).getBoolean('FOO', true)).to.be.true;
    });
  });

  context('when defined, but not valid', () => {
    it('should return the default', () => {
      const env = { FOO: 'not_a_bool' };
      expect(() => typedConfig(env).getBoolean('FOO')).to.throw(
        Error,
        `Invalid configuration: FOO must be 'true' or 'false' not 'not_a_bool'`,
      );
    });
  });
});
