const request = require('supertest')
const app = require('../../app')
const connect = require('../../config/db')

describe('Authentication', () => {
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
  })

  test('GET /api/auth/ should return 401 when not logged in', async () => {
    const response = await request(app)
      .get('/api/auth')
      .expect('Content-Type', /json/)
      .expect(401)
    expect(response.body).toEqual({ status: false, error: 'Unauthorized' })
  })

  test('POST /api/auth/ should return 403 when trying to log in with wrong credentials', async () => {
    const response = await request(app)
      .post('/api/auth')
      .send(invalidCredentials)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
    expect(response.body).toEqual({ status: false, error: 'Not Authenticated' })
  })

  test('POST /api/auth/ should return 403 when trying to log in with wrong credentials', async () => {
    const response = await request(app)
      .post('/api/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(validCredentials)
      .expect(403)
    expect(response.body).toEqual({ status: false, error: 'Not Authenticated' })
  })
})
