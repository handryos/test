import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: 'https://bfce172fa9c1cf28341d6b52b57fa8ae@o4509706351869952.ingest.us.sentry.io/4509730695806976',
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});
