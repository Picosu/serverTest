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

describe('example nested request', () => {
    it('should return the owner of the post', async () => {
      const post: Response = await supertest('').get('https://jsonplaceholder.typicode.com/posts/6')
      const user: Response = await supertest('').get('https://jsonplaceholder.typicode.com/users/' + post.body.userId)
      expect(user.body.id).toBe(1)
    })
  })

describe('example request with header', () => {
    it('should return 200', async () => {
      const res: Response = await supertest('').get('https://jsonplaceholder.typicode.com/posts/6').set('mon-nom-de-header', 'ma-valeur')
      expect(res.status).toBe(200)
    })
  })