export interface ProcessEnv {
    [key: string]: string | undefined
}

interface Options {
    pattern?: RegExp
}

export default function typedConfig(env: ProcessEnv) {
    return {
        getString(key: string, opts: Options = {}):string {
            const val = env[key]
            if (val === undefined) throw new Error(`Invalid configuration: ${key} is undefined`)
            if (opts.pattern) {
                if (!opts.pattern.test(val)) {
                    throw new Error(`Invalid configuration: value '${val}' for key '${key}' does not match pattern ${opts.pattern.toString()}`)
                }
            }
            return val
        },

        getInt(key: string):number {
            const val = env[key]
            if (val === undefined) throw new Error(`Invalid configuration: ${key} is undefined`)
            const intVal = parseInt(val, 10)
            if (isNaN(intVal)) throw new Error(`Invalid configuration: ${key} is not a number`)
            return intVal
        },

        getBool(key: string, defaultValue: boolean | undefined = undefined):boolean {
            const val = env[key]
            if (val === undefined) {
                if (defaultValue !== undefined) {
                    return defaultValue
                } else {
                    throw new Error(`Invalid configuration: ${key} must be 'true' or 'false' not undefined`)
                }
            }
            if (!['true', 'false'].includes(val)) {
                throw new Error(`Invalid configuration: ${key} must be 'true' or 'false' not '${val}'`)
            }
            return val === 'true'
        }
    }
}