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