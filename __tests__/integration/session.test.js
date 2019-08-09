const request = require('supertest')

const app = require('../../src/app')
const factory = require('../factories')
const truncate = require('../utils/truncate')

describe('Authenticate', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should authenticate with valid credentials',async () => {
        const user = await factory.create('User',{
            password: '123123'
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
        const user = await factory.create('User',{
            password: '123123'
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
        const user = await factory.create('User',{
            password: '123123'
        })
        const response = await request(app)
            .post('/session')
            .send({
                email: user.email,
                password: '123123'
            })

        expect(response.body).toHaveProperty('token')
    })

    it('should be able to access private routes when autheinticate', async () => {
        const user = await factory.create('User',{
            password: '123123'
        })
        const response = await request(app)
            .get('/dash')
            .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200)
    })

    it('should not be able to access private routes without token', async () => {
        const user = await factory.create('User',{
            password: '12312'
        })
        const response = await request(app)
            .get('/dash')

        expect(response.status).toBe(401)
    })

    it('should not be able to access private routes with invalid token', async () => {
        const user = await factory.create('User',{
            password: '123123'
        })
        const response = await request(app)
            .get('/dash')
            .set('Authorization', `Bearer 1234`)

        expect(response.status).toBe(401)
    })

    
})

