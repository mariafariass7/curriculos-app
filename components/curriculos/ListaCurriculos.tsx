'use client';

import { useMemo, useState } from 'react';
import type { Curriculo } from '../../lib/types';
import CardCurriculo from './CardCurriculo';

interface ListaCurriculosProps {
  curriculos: Curriculo[];
}

export default function ListaCurriculos({ curriculos }: ListaCurriculosProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return curriculos;
    return curriculos.filter((curriculo) => {
      return (
        curriculo.nome.toLowerCase().includes(normalized) ||
        curriculo.cargo.toLowerCase().includes(normalized)
      );
    });
  }, [curriculos, search]);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <label className="block text-sm font-semibold text-slate-900">Filtrar por nome ou cargo</label>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Digite nome ou cargo"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((curriculo) => (
            <CardCurriculo key={curriculo.id} curriculo={curriculo} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-soft">
          Nenhum currículo encontrado para a pesquisa.
        </div>
      )}
    </section>
  );
}
