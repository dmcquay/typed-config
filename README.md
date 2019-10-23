typed-config is a very simple and opinionated library for getting config values from
the environment in TypeScript. The design goals are:

- Get config values from process.env
- Validate them and provide useful error messages
- Return the values with meaningful types

![@dmcquay/typed-config usage example](http://g.recordit.co/oBYCecaFpq.gif)

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

## API

```ts
function getString(key: string, opts: StringOptions = {}): string
function getNumber(key: string, opts: NumberOptions = {}): number
function getInteger(key: string, opts: NumberOptions = {}): number
function getBoolean(key: string, defaultValue?: boolean): boolean

interface IStringOptions {
    pattern?: RegExp
}

interface INumberOptions {
    maxValue?: number,
    minValue?: number
}
```