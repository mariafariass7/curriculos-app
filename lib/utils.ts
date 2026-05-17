import type { Curriculo } from './types';

export function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}

export function resumoCurto(text: string, maxLength = 140) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function formatTelefone(value: string) {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

export function formatCPF(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function parseHabilidades(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function initialCurriculo(): Curriculo {
  return {
    id: generateId(),
    nome: '',
    cargo: '',
    email: '',
    telefone: '',
    cpf: '',
    resumo: '',
    fotoUrl: '',
    experiencias: [
      { empresa: '', cargo: '', periodo: '', descricao: '' },
    ],
    formacoes: [
      { instituicao: '', curso: '', periodo: '' },
    ],
    habilidades: [],
  };
}
