import supertest, { Response } from 'supertest'
import { request } from 'http'

describe('Preprod internationale test', () => {
  var currentLocale = 'eng_E1'
  describe('GET /syncVersion', () => {
    var currentUrl = 'https://lv-lvpassv5-prp.herokuapp.com/api/v5.3/syncVersion?locale=' + currentLocale
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl)
      expect(res.status).toBe(200)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl)
      expect(res.status).toBe(405)
    })
  })

  
  describe('Web-cache-catalog', () => {
    var currentUrl = 'https://pass.louisvuitton.com/api/v5.3/website-cache-catalog?locale=' + currentLocale
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl).set('x-wsse', 'true')
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl).set('x-wsse', 'true')
      expect(res.status).toBe(405)
    })
  })

  
  describe('Detail-catalog', () => {
    var currentUrl = 'https://pass.louisvuitton.com/api/v5.3/detail-catalog?id=hommepersonnalisationceintures&country=FR&locale=' + currentLocale
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl)
      expect(res.status).toBe(200)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl)
      expect(res.status).toBe(405)
    })
  })

  
  describe('Auto Complete', () => {
    var currentUrl = 'https://pass.louisvuitton.com/api/v6/geocodings/autocomplete?input="rue"&country=ES&locale=' + currentLocale
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl)
      expect(res.status).toBe(200)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl)
      expect(res.status).toBe(405)
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
      const res: Response = await supertest('').get('https://jsonplaceholder.typicode.com/posts/6')
      expect(res.status).toBe(200)
    })
  })

  
})