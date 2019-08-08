const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../../app')
const config = require('../../config')
const connect = require('../../config/db')
const User = require('../user/user.model')

const secret = config.get('jwt_secret')

describe('Authentication', () => {
  let user
  const invalidCredentials = {
    email: 'root@localhost',
    password: 'secret',
  }

  const validCredentials = {
    email: 'root@localhost',
    password: 'password',
  }

  beforeAll(async () => {
    connect()

    await User.deleteOne({ email: validCredentials.email })

    const userAttributes = {
      firstName: 'test',
      lastName: 'test',
      ...validCredentials,
    }
    user = await User.create(userAttributes)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  test('GET /api/auth/ should return 401 when not logged in', async () => {
    const response = await request(app)
      .get('/api/auth')
      .expect('Content-Type', /json/)
      .expect(401)
    expect(response.body).toEqual({ status: false, error: 'Unauthorized' })
  })

  test('GET /api/auth/ should return 200 when logged in', async () => {
    const payload = { id: user.id, email: user.email }
    const token = await jwt.sign(payload, secret, { expiresIn: 36000 })
    const response = await request(app)
      .get('/api/auth')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toHaveProperty('_id', user.id)
  })

  test('POST /api/auth/ should return 403 when trying to log in with wrong credentials', async () => {
    const response = await request(app)
      .post('/api/auth')
      .set('Content-Type', 'application/json')
      .send(invalidCredentials)
      .expect('Content-Type', /json/)
      .expect(403)
    expect(response.body).toEqual({ status: false, error: 'Forbidden' })
  })

  test('POST /api/auth/ should return a valid token when trying to log in with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(validCredentials)
      .expect(200)
    expect(response.body)
      .toHaveProperty('status', true)
    expect(response.body)
      .toHaveProperty('token')

    const token = response.body.token.split('Bearer ')[1]
    await jwt.verify(token, secret)
  })
})
