import 'reflect-metadata'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '@interface/http/app'
import db from '@infrastructure/database/db'
import User from '@domain/user'
import { ConfigInterface } from '@ports'
import { container } from '@interface/http/container'
import { types } from '@interface/http/types'

const config = container.get<ConfigInterface>(types.config)

const secret = config.jwtSecret

describe('Users', () => {
  const userAttributes = {
    firstName: 'test',
    lastName: 'test',
    password: 'secret',
  }

  const getUserToken = async () => {
    const email = Math.random().toString(16)
    await User.create({
      ...userAttributes,
      email,
    })
    const user = await User.findOne({ email })
    const token = await jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: 36000 })
    return { user, token }
  }

  const deleteUser = async (user: any) => {
    await User.deleteOne({ email: user.email })
  }

  beforeAll(async () => {
    await db.connect()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  test('GET /api/users/ should return 401 when not logged in', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(401)
    expect(response.body).toEqual({ status: false, error: 'Unauthorized' })
  })

  test('GET /api/users/ should return 200 when logged in', async () => {
    const { user, token } = await getUserToken()

    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toHaveProperty('users')

    deleteUser(user)
  })

  test('POST /api/users/ should return 500 when trying to create an account with invalid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(500)
    expect(response.body).toHaveProperty('status', false)
  })

  test('POST /api/users/ should return 200 when trying to create an account with valid data', async () => {
    const email = Math.random().toString(16)

    const response = await request(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({ ...userAttributes, email })
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toHaveProperty('_id')

    User.deleteOne({ email })
  })

  test('GET /api/users/:id should return 401 when not logged in', async () => {
    const { user } = await getUserToken()

    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .expect('Content-Type', /json/)
      .expect(401)
    expect(response.body).toEqual({ status: false, error: 'Unauthorized' })

    deleteUser(user)
  })

  test('GET /api/users/:id should return 200 when logged in', async () => {
    const { user, token } = await getUserToken()

    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toHaveProperty('_id', user.id)

    deleteUser(user)
  })

  test('PATCH /api/users/:id should return 401 when not logged in', async () => {
    const { user } = await getUserToken()

    const response = await request(app)
      .patch(`/api/users/${user.id}`)
      .expect('Content-Type', /json/)
      .expect(401)
    expect(response.body).toEqual({ status: false, error: 'Unauthorized' })

    deleteUser(user)
  })

  test('PATCH /api/users/:id should return 200 when logged in', async () => {
    const { user, token } = await getUserToken()

    const random = Math.random().toString(16)
    const response = await request(app)
      .patch(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ firstName: random })
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body.firstName).toEqual(random)

    deleteUser(user)
  })

  test('DELETE /api/users/:id should return 401 when not logged in', async () => {
    const { user } = await getUserToken()

    const response = await request(app)
      .delete(`/api/users/${user.id}`)
      .expect('Content-Type', /json/)
      .expect(401)
    expect(response.body).toEqual({ status: false, error: 'Unauthorized' })

    deleteUser(user)
  })

  test('DELETE /api/users/:id should return 200 when logged in', async () => {
    const { user, token } = await getUserToken()

    const response = await request(app)
      .delete(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toHaveProperty('status', true)
  })
})
