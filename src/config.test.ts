import {expect} from 'chai'

import typedConfig from './config'

describe('#getString', () => {
    context('when value is defined', () => {
        it('should return the value as a string', () => {
            const env = {FOO: 'bar'}
            expect(typedConfig(env).getString('FOO')).to.equal('bar')
        })
    })

    context('when value is not defined', () => {
        it('should throw with a useful error', () => {
            const env = {}
            expect(() => typedConfig(env).getString('FOO')).to.throw(Error, `Invalid configuration: FOO is undefined`)
        })
    })

    context('when value is does not match provided regex', () => {
        it('should throw with a useful error', () => {
            const env = {FOO: 'bar'}
            expect(() => typedConfig(env).getString('FOO', {pattern: /^notbar$/})).to.throw(Error, `Invalid configuration: value 'bar' for key 'FOO' does not match pattern /^notbar$/`)
        })
    })
})

describe('#getInt', () => {
    context('when value is defined', () => {
        it('should return the value as an integer', () => {
            const env = {FOO: '6'}
            expect(typedConfig(env).getInt('FOO')).to.equal(6)
        })
    })

    context('when value is not defined', () => {
        it('should throw with a useful error', () => {
            const env = {}
            expect(() => typedConfig(env).getInt('FOO')).to.throw(Error, `Invalid configuration: FOO is undefined`)
        })
    })

    context('when value is not a number', () => {
        it('should throw with a useful error', () => {
            const env = {FOO: 'asdf'}
            expect(() => typedConfig(env).getInt('FOO')).to.throw(Error, `Invalid configuration: FOO is not a number`)
        })
    })

    context('when value is a decimal', () => {
        it('should truncate to an integer', () => {
            const env = {FOO: '6.1'}
            expect(typedConfig(env).getInt('FOO')).to.equal(6)
        })
    })
})

describe('#getBool', () => {
    context('when set to "true"', () => {
        it('should return true', () => {
            const env = {FOO: 'true'}
            expect(typedConfig(env).getBool('FOO')).to.equal(true)
        })
    })

    context('when set to "false"', () => {
        it('should return false', () => {
            const env = {FOO: 'false'}
            expect(typedConfig(env).getBool('FOO')).to.equal(false)
        })
    })

    context('when undefined and no default provided', () => {
        it('should throw with a useful error', () => {
            const env = {}
            expect(() => typedConfig(env).getBool('FOO')).to.throw(Error, `Invalid configuration: FOO must be 'true' or 'false' not undefined`)
        })
    })

    context('when undefined and default provided', () => {
        it('should return the default', () => {
            const env = {}
            expect(typedConfig(env).getBool('FOO', false)).to.be.false
            expect(typedConfig(env).getBool('FOO', true)).to.be.true
        })
    })

    context('when defined, but not valid', () => {
        it('should return the default', () => {
            const env = {FOO: 'not_a_bool'}
            expect(() => typedConfig(env).getBool('FOO')).to.throw(Error, `Invalid configuration: FOO must be 'true' or 'false' not 'not_a_bool'`)
        })
    })
})