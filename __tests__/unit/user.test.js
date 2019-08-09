const bcrypt = require('bcryptjs')

const { User } = require('../../src/models')
const truncate = require('../utils/truncate')

describe('User', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should encrypt user password' , async () => {
        const user = await User.create({
            name: 'Rennan',
            email: 'rennan@teste.com',
            password: '123123'
        })

        const compareHash = await bcrypt.compare('123123', user.password_hash)

        expect(compareHash).toBe(true)
    })

})