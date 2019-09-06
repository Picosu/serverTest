import supertest, { Response } from 'supertest'

describe('google test', () => {
  describe('google.fr', () => {
    it('should return 301 on get', async () => {
      const res: Response = await supertest('').get('http://google.fr')
      expect(res.status).toBe(301)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post('http://google.fr')
      expect(res.status).toBe(405)
    })
  })
  describe('google.com', () => {
    it('should return 301 on get', async () => {
      const res: Response = await supertest('').get('http://google.com')
      expect(res.status).toBe(301)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post('http://google.com')
      expect(res.status).toBe(405)
    })
  })
})