import type { Curriculo } from './types';

const STORAGE_KEY = 'curriculos_app_curriculos';

export function loadCurriculos(): Curriculo[] {
  if (typeof window === 'undefined') return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Curriculo[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCurriculos(curriculos: Curriculo[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculos));
}
