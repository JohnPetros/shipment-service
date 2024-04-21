import { app } from 'app'

import { envConfig } from '@configs/envConfig'

app.startServer()

app.setCron('* * * * *', async () => {
  fetch(`${envConfig.DOMAIN}/auth/refresh_token`, {
    method: 'POST',
  })
})