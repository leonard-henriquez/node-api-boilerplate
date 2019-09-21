import request from 'supertest'
import app from '../app'

const here = () => {
  console.log('here')
}

describe('Test framework routes', () => {
  test('Get answer from /', async () => {
    await request(app)
      .get('/api/health')
      .expect(200)
  })

  test('Get not found answer from /not-found', async () => {
    const response = await request(app)
      .get('/api/not-found')
      .expect('Content-Type', /json/)
      .expect(404)
    expect(response.body).toEqual({ status: false, error: 'Not Found' })
  })
})
