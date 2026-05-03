import type { IconName, SocialLink } from '../../domain/siteContent';

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false">
        <path d="M16 10h34L28 32l22 22H16" />
        <path d="M14 12l20 20-20 20" />
        <circle cx="14" cy="12" r="5" />
        <circle cx="34" cy="32" r="6" />
        <circle cx="14" cy="52" r="5" />
        <circle cx="50" cy="54" r="5" />
      </svg>
    </span>
  );
}

export function Icon({ name }: { name: IconName }) {
  if (name === 'network') {
    return (
      <svg className="symbol" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="13" r="5" />
        <circle cx="13" cy="32" r="5" />
        <circle cx="35" cy="32" r="5" />
        <path d="M21 17l-6 10M27 17l6 10M18 32h12" />
      </svg>
    );
  }

  if (name === 'target') {
    return (
      <svg className="symbol" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="15" />
        <circle cx="24" cy="24" r="6" />
        <path d="M24 4v8M24 36v8M4 24h8M36 24h8" />
      </svg>
    );
  }

  if (name === 'shield') {
    return (
      <svg className="symbol" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6l15 6v11c0 10-6 16-15 19C15 39 9 33 9 23V12l15-6z" />
        <path d="M18 24l4 4 8-9" />
      </svg>
    );
  }

  if (name === 'bolt') {
    return (
      <svg className="symbol" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 4L12 27h12l-4 17 16-24H24l4-16z" />
      </svg>
    );
  }

  if (name === 'blocks') {
    return (
      <svg className="symbol" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6l10 6-10 6-10-6 10-6z" />
        <path d="M14 18l10 6v12l-10-6V18z" />
        <path d="M34 18l-10 6v12l10-6V18z" />
      </svg>
    );
  }

  if (name === 'chart') {
    return (
      <svg className="symbol" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 38h30" />
        <path d="M15 33V23" />
        <path d="M24 33V14" />
        <path d="M33 33v-7" />
        <path d="M13 19l8-5 6 4 8-7" />
      </svg>
    );
  }

  return (
    <svg className="symbol" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="15" />
      <path d="M24 14v10l6 6" />
    </svg>
  );
}

export function SocialIcon({ name }: { name: SocialLink['label'] }) {
  if (name === 'LinkedIn') {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.6 8.2v9.2M6.6 5.8h.1M10.4 17.4V8.2M10.4 11.2c.8-2.2 4.2-2.6 5.3-.3.3.7.4 1.5.4 2.3v4.2" />
      </svg>
    );
  }

  if (name === 'X') {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 5l12 14M18 5L6 19" />
      </svg>
    );
  }

  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.4 19c-4.2 1.2-4.2-2.4-5.9-3M15.3 21v-3.1c0-1 .1-1.7-.4-2.2 2.8-.3 5.8-1.4 5.8-6.2 0-1.4-.5-2.5-1.3-3.4.1-.3.6-1.7-.1-3.5 0 0-1.1-.3-3.6 1.3a12.6 12.6 0 0 0-6.4 0C6.8 2.3 5.7 2.6 5.7 2.6c-.7 1.8-.2 3.2-.1 3.5-.8.9-1.3 2-1.3 3.4 0 4.8 3 5.9 5.8 6.2-.5.5-.9 1.2-.9 2.4V21" />
    </svg>
  );
}

export function ThemeToggleIcon({ theme }: { theme: 'light' | 'dark' }) {
  if (theme === 'dark') {
    return (
      <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 14.5A6.5 6.5 0 1 1 9.5 6a5.6 5.6 0 0 0 8.5 8.5z" />
      </svg>
    );
  }

  return (
    <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M21.5 12h-2.4M4.9 12H2.5M18.7 5.3l-1.7 1.7M7 17l-1.7 1.7M18.7 18.7L17 17M7 7 5.3 5.3" />
    </svg>
  );
}
