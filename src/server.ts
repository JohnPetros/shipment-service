import { app } from 'app'

import { envConfig } from '@configs/envConfig'

app.startServer()

app.setCron('0 0 * * 0', async () => {
  fetch(`${envConfig.DOMAIN}/auth/refresh_token`, {
    method: 'POST',
  })
})