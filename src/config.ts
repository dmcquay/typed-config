export interface ProcessEnv {
    [key: string]: string | undefined
}

interface Options {
    pattern?: RegExp
}

export default function typedConfig(env: ProcessEnv) {
    return {
        getString(key: string, opts: Options = {}):string|undefined {
            const val = env[key]
            if (val === undefined) throw new Error(`Invalid configuration: ${key} is undefined`)
            if (opts.pattern) {
                if (!opts.pattern.test(val)) {
                    throw new Error(`Invalid configuration: value '${val}' for key '${key}' does not match pattern ${opts.pattern.toString()}`)
                }
            }
            return val
        }
    }
}