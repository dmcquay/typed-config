This is just an idea. Though it is tested, it is not intended for others to use yet. I'm just playing with the idea to see if it seems worthwhile.

## Example usage

```
import typedConfig from './config'

const config = typedConfig(process.env)

export default {
    host: config.getString('API_BASE_URL', {pattern: /^https?:\/\/\w+$/}),
    isDev: config.getBool('ENABLE_FEATURE_X', false),
    maxWidgetCount: config.getInt('MAX_WIDGET_COUNT')
}
```