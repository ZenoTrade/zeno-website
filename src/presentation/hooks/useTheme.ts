import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';
const THEME_STORAGE_KEY = 'zeno-theme';

function storage(): Pick<Storage, 'getItem' | 'setItem'> | null {
  try {
    const s = typeof window === 'undefined' ? null : window.localStorage;
    return s && typeof s.getItem === 'function' && typeof s.setItem === 'function' ? s : null;
  } catch {
    return null;
  }
}

function initialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const stored = storage()?.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      storage()?.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // storage can be blocked; the theme still applies for this visit
    }
  }, [theme]);

  const next: ThemeMode = theme === 'light' ? 'dark' : 'light';
  return { theme, next, toggle: () => setTheme(next) };
}
