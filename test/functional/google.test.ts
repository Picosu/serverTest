import supertest, { Response } from 'supertest'
import { request } from 'http'
import { emptyStatement } from '@babel/types'

jest.setTimeout(1000)
const BASE_URL = "http://localhost:3000";

describe('Preprod internationale test', () => {
  var domain = 'https://lvpass-prp.herokuapp.com'
  var prodTest = 'https://lv-lvpass18-prd.herokuapp.com'
  var currentLocale = 'eng_E1'
  var headers =
  {
    'x-wsse': 'true',
    'User-Agent': 'LVapp/android/5.4.6 LVApp PRD'
  }

  const myReq = require('supertest')

  describe('SyncVersion', () => {
    var currentUrl = domain + '/api/v5.3/syncVersion?locale=' + currentLocale
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl)
      expect(res.status).toBe(200)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl)
      expect(res.status).toBe(405)
    })
  })


  describe('Sync', () => {
    var currentUrl = domain + '/api/v5.3/sync?locale=' + currentLocale
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl).set(headers)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl).set(headers)
      expect(res.status).toBe(405)
    })
  })

  describe('Web-cache-catalog', () => {
    var currentUrl = `${domain}/api/v5.3/website-cache-catalog?locale=${currentLocale}`
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl).set(headers)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl).set(headers)
      expect(res.status).toBe(405)
    })
  })


  describe('Detail-catalog', () => {
    var firstUrl = domain + '/api/v5.3/website-cache-catalog?locale=' + currentLocale
    var currentUrl = domain + '/api/v5.3/detail-catalog?locale=' + currentLocale
    it('should return 200 on get', async () => {
      const get: Response = await supertest('').get(firstUrl).set(headers)

      expect(get.body.femme.contents[0].contents[0]).toHaveLength
      var userId = get.body.femme.contents[0].contents[0].id

      var detailUrl = currentUrl + '&id=' + userId
      const res: Response = await supertest('').get(detailUrl).set('x-wsse','true').set('User-Agent','LVapp/android/5.4 LVApp PRD')

      expect(res.status).toBe(200)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl).set(headers)
      expect(res.status).toBe(405)
    })
  })

  /* 
  describe("example with debug server", () => {
    it("should send request to the debug server", async () => {
      const res: Response = await supertest("")
        .get(`${domain}/api/v5.3/detail-catalog?locale=${currentLocale}`)
        .set(headers);
      expect(res.status).toBe(200);
    });
  }); */

  describe('Auto Complete', () => {
    var currentUrl = `${domain}/api/v6/geocodings/autocomplete?input="rue"&country=FR&locale=${currentLocale}`
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl)
      console.log(currentUrl)
      expect(res.status).toBe(200)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl)
      expect(res.status).toBe(405)
    })
  })

  describe('SaveLook', () => {
    var currentUrl = domain + '/api/v6/saveLook'
    it('should return 405 on get', async () => {
      const res: Response = await supertest('').get(currentUrl)
      expect(res.status).toBe(405)
    })
    it('should return 200 on post', async () => {
      const res: Response = await supertest('').post(currentUrl).send({ "salesforceUserId": '00555000003bbe4AAA','':'' }) // 00555000003bbe4AAA => mylvtest9@dispostable.com
      expect(res.status).toBe(200)
    })
    it('should not return 200 on post', async () => {
      const res: Response = await supertest('').post(currentUrl).send({ "salesforceUserId": '00555000003bbe4AAA','':'' }) // 00555000003bbe4AAA => mylvtest9@dispostable.com
      expect(res.status).not.toBe(200)
    })
  })

  describe('Wishlist', () => {
    var currentUrl = domain + '/api/v5.3/wishlists/custom?salesforce_id=' + '00555000003bbe4AAA'
    it('should return 200 on get', async () => {
      const res: Response = await supertest('').get(currentUrl).set(headers)
      expect(res.body.success).toBe(true)
      expect(res.status).toBe(200)
    })
    it('should return 405 on post', async () => {
      const res: Response = await supertest('').post(currentUrl)
      expect(res.status).toBe(405)
    })
  })

})