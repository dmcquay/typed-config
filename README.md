typed-config is a very simple and opinionated library for getting config values from
the environment. The design goals are:

- Get config values from process.env
- Validate them and provide useful error messages
- Return the values with meaningful types

![@dmcquay/typed-config usage example](http://g.recordit.co/IyLnMGtWm9.gif)

## Install

`npm install -S @dmcquay/typed-config`

## Example usage

You might create a file called `config.ts` with the following contents.

```ts
import typedConfig from '@dmcquay/typed-config'

const config = typedConfig()

export default {
    apiBaseUrl: config.getString('API_BASE_URL', {pattern: /^https?:\/\/\w+$/}),
    enableFeatureX: config.getBoolean('ENABLE_FEATURE_X', false),
    isDev: config.getBoolean('IS_DEV'),
    maxWidgetCount: config.getInteger('MAX_WIDGET_COUNT')
}
```

Then from other files, you read config by importing `config.ts`.

The apiBaseUrl key will be a string type, isDev a bool and maxWidgetCount a number. TypeScript will be aware of this.

If any of the following validations fails, it will throw with a helpful message:

- API_BASE_URL is undefined
- API_BASE_URL doesn't match the provided pattern
- ENABLE_FEATURE_X is not 'true' or 'false'
- IS_DEV is not 'true' or 'false'
- IS_DEV is not defined (because no default is provided)
- MAX_WIDGET_COUNT is not defined or is not a number

# API

```ts
function getString(key: string, opts: StringOptions = {}): string

interface StringOptions {
    pattern?: RegExp
}

function getNumber(key: string, opts: NumberOptions = {}): number
function getInteger(key: string, opts: NumberOptions = {}): number

interface NumberOptions {
    maxValue?: number,
    minValue?: number
}

getBoolean(key: string, defaultValue: boolean | undefined = undefined): boolean
```