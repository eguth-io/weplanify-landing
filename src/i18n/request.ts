// The active request config lives at the project root (`/i18n.ts`), referenced by
// the next-intl plugin in next.config.ts. This file re-exports it to avoid a
// stale duplicate drifting out of sync.
export { default } from '../../i18n';
