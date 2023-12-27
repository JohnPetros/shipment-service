import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { httpClientProviderMock } from '@providers/HttpClientProvider/mocks/httpClientProviderMock'
import request from 'supertest'
import { app } from 'app'

describe('Generate Token Use Case', () => {
  beforeAll(async () => {
    await app.waitServerAvailability()
    httpClientProviderMock.listen()
  })
  afterEach(() => httpClientProviderMock.resetHandlers())
  afterAll(async () => {
    await app.closeServer()
    httpClientProviderMock.close()
  })

  // it('should not be able to generate a token when code is not defined', async () => {
  //   await request(app.getServer()).get('/auth/callback').expect(401)
  // })

  // it('should be able to generate a token', async () => {
  //   const response = await request(app.getServer())
  //     .get('/auth/callback?code="code-mock"')
  //     .expect(200)

  //   expect(response.body).toEqual(
  //     expect.objectContaining({
  //       accessToken: jwtMock.accessToken,
  //       refreshToken: jwtMock.refreshToken,
  //     }),
  //   )
  // })

  // it('should be able to set cookie when token is genereted', async () => {
  //   const response = await request(app.getServer()).get(
  //     '/auth/callback?code="code-mock"',
  //   )

  //   expect(response.get('Set-Cookie').length).toBe(3)
  // })
})
