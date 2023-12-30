import { IMonitor } from './IMonitor'
import * as SentryInstance from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'

export class SentryMonitor implements IMonitor {
  sentry: typeof SentryInstance

  constructor() {
    this.sentry = SentryInstance

    this.sentry.init({
      dsn: 'https://e9098880b7bc8affb268743d49764272@o4506479821914112.ingest.sentry.io/4506479832268800',
      integrations: [new ProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    })
  }

  logError(error: unknown) {
    const transaction = this.sentry.startTransaction({
      op: 'error',
      name: 'App error',
    })
    this.sentry.captureException(error)
    transaction.finish()
  }
}
