const {User} = require('../../src/models')

describe('Authenticate', () => {
    it('should sum two numbers',async () => {
        const user = await User.create({
            name: 'Rennan',
            email: 'rennan@teste.com',
            password_hash:'rennan520'
        })

        console.log(user)
        
        expect(user.email).toBe('rennan@teste.com')
    })
})

