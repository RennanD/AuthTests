const request = require('supertest')

const app = require('../../src/app')
const { User } = require('../../src/models')
const truncate = require('../utils/truncate')

describe('Authenticate', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should authenticate with valid credentials',async () => {
        const user = await User.create({
            name: 'Rennan',
            email: 'rennan@teste.com',
            password:'123123'
        })
        const response = await request(app)
            .post('/session')
            .send({
                email: user.email,
                password: '123123'
        })

        expect(response.status).toBe(200)
    })

    it('should not authneticate with invalid credentials', async () => {
        const user = await User.create({
            name: 'Rennan',
            email: 'rennan@teste.com',
            password:'123123'
        })
        const response = await request(app)
            .post('/session')
            .send({
                email: user.email,
                password: '12312'
        })

        expect(response.status).toBe(401)
    })

    it('should return JWT token when authenticate', async () => {
        const user = await User.create({
            name: 'Rennan',
            email: 'rennan@teste.com',
            password:'123123'
        })
        const response = await request(app)
            .post('/session')
            .send({
                email: user.email,
                password: '123123'
            })

        expect(response.body).toHaveProperty('token')
    })

    it('should be able to access private routes when authenticate', async () => {
        const user = await User.create({
            name: 'Rennan',
            email: 'rennan@teste.com',
            password:'123123'
        })
        const response = await request(app)
            .get('/dashboard')
            // .set('Authorization', `Bearer ${}`)

        expect(response.body).toHaveProperty('token')
    })
})

