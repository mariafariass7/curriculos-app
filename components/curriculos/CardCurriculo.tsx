import Link from 'next/link';
import type { Curriculo } from '../../lib/types';
import { resumoCurto } from '../../lib/utils';

interface CardCurriculoProps {
  curriculo: Curriculo;
}

export default function CardCurriculo({ curriculo }: CardCurriculoProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-slate-100 text-xl font-semibold text-slate-700">
          {curriculo.fotoUrl ? (
            <img src={curriculo.fotoUrl} alt={curriculo.nome} className="h-full w-full object-cover" />
          ) : (
            curriculo.nome
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{curriculo.nome}</h2>
          <p className="text-sm text-slate-500">{curriculo.cargo}</p>
        </div>
      </div>
      <p className="mb-5 text-sm leading-6 text-slate-600">{resumoCurto(curriculo.resumo, 160)}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/sistema/paginas/curriculos/${curriculo.id}`}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
