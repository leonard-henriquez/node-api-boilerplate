const request = require('supertest')
const app = require('../app')

describe('Test framework routes', () => {
  test('Get answer from /', async () => {
    await request(app).get('/api/health').expect(200)
  })
})
