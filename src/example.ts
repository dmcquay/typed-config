import typedConfig from './config'

const configProvider = typedConfig(process.env)

export default {
    host: configProvider.getString('API_BASE_URL', {pattern: /^https?:\/\/\w+$/})
}