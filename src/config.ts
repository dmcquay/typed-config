export interface IProcessEnv {
  [key: string]: string | undefined;
}

export interface IStringOptions {
  pattern?: RegExp;
}

export interface INumberOptions {
  maxValue?: number;
  minValue?: number;
}

export default function typedConfig(env: IProcessEnv = process.env) {
  return {
    getString(key: string, opts: IStringOptions = {}): string {
      const val = env[key];
      if (val === undefined) {
        throw new Error(`Invalid configuration: ${key} is undefined`);
      }
      if (opts.pattern) {
        if (!opts.pattern.test(val)) {
          throw new Error(
            `Invalid configuration: value '${val}' for key '${key}' does not match pattern ${opts.pattern.toString()}`,
          );
        }
      }
      return val;
    },

    getNumber(key: string, opts: INumberOptions = {}): number {
      const val = env[key];
      if (val === undefined) {
        throw new Error(`Invalid configuration: ${key} is undefined`);
      }
      const numVal = parseFloat(val);
      if (isNaN(numVal)) {
        throw new Error(`Invalid configuration: ${key} is not a number`);
      }
      if (opts.maxValue !== undefined && numVal > opts.maxValue) {
        throw new Error(
          `Invalid configuration: value '${val}' for key '${key}' is larger than max value of ${opts.maxValue}`,
        );
      }
      if (opts.minValue !== undefined && numVal < opts.minValue) {
        throw new Error(
          `Invalid configuration: value '${val}' for key '${key}' is less than min value of ${opts.minValue}`,
        );
      }
      return numVal;
    },

    getInteger(key: string, opts: INumberOptions = {}): number {
      return Math.floor(this.getNumber(key));
    },

    getBoolean(key: string, defaultValue?: boolean): boolean {
      const val = env[key];
      if (val === undefined) {
        if (defaultValue !== undefined) {
          return defaultValue;
        } else {
          throw new Error(`Invalid configuration: ${key} must be 'true' or 'false' not undefined`);
        }
      }
      if (!['true', 'false'].includes(val)) {
        throw new Error(`Invalid configuration: ${key} must be 'true' or 'false' not '${val}'`);
      }
      return val === 'true';
    },
  };
}
