This is just an idea. Though it is tested, it is not intended for others to use yet. I'm just playing with the idea to see if it seems worthwhile.

## Example usage

You might create a file called `config.ts` with the following contents.

```ts
import typedConfig from './config'

const config = typedConfig(process.env)

export default {
    apiBaseUrl: config.getString('API_BASE_URL', {pattern: /^https?:\/\/\w+$/}),
    enableFeatureX: config.getBool('ENABLE_FEATURE_X', false),
    isDev: config.getBool('IS_DEV'),
    maxWidgetCount: config.getInt('MAX_WIDGET_COUNT')
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
getString(key: string, opts: StringOptions = {}): string

interface StringOptions {
    pattern?: RegExp
}

getNumber(key: string, opts: NumberOptions = {}): number
getInteger(key: string, opts: NumberOptions = {}): number

export interface NumberOptions {
    maxValue?: number,
    minValue?: number
}

getBoolean(key: string, defaultValue: boolean | undefined = undefined): boolean
```