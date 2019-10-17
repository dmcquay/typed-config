import typedConfig from './config'

const config = typedConfig(process.env)

export default {
    host: config.getString('API_BASE_URL', {pattern: /^https?:\/\/\w+$/}),
    isDev: config.getBool('ENABLE_FEATURE_X', false),
    maxWidgetCount: config.getInt('MAX_WIDGET_COUNT')
}