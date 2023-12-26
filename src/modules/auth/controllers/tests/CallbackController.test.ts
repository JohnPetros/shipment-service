import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { apiServerMock } from '@providers/HttpClientProvider/mocks/httpClientProviderMock'
import request from 'supertest'
import { app } from 'app'
import { jwtMock } from '@entities/mocks/jwtMock'

describe('Generate Token Use Case', () => {
  beforeAll(async () => {
    await app.waitServerAvailability()
    apiServerMock.listen()
  })
  afterEach(() => apiServerMock.resetHandlers())
  afterAll(async () => {
    await app.closeServer()
    apiServerMock.close()
  })

  it('should not be able to generate a token when code is not defined', async () => {
    await request(app.getServer()).get('/auth/callback').expect(401)
  })

  it('should be able to generate a token', async () => {
    const response = await request(app.getServer())
      .get('/auth/callback?code="code-mock"')
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: jwtMock.accessToken,
        refreshToken: jwtMock.refreshToken,
        expiresIn: jwtMock.expiresIn,
      }),
    )
  })

  it('should be able to set cookie when token is genereted', async () => {
    const response = await request(app.getServer()).get(
      '/auth/callback?code="code-mock"',
    )

    expect(response.get('Set-Cookie').length).toBe(3)
  })
})
