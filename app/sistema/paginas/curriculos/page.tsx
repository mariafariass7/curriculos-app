'use client';

import ListaCurriculos from "../../../../components/curriculos/ListaCurriculos";
import { useCurriculos } from "../../../../hooks/useCurriculos";
export default function CurriculosPage() {
  const { curriculos } = useCurriculos();

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Currículos</p>
          <h1 className="text-3xl font-semibold text-slate-950">Lista de currículos</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Veja todos os currículos cadastrados no localStorage e use o filtro para encontrar por nome ou cargo.
          </p>
        </div>
      </div>

      <ListaCurriculos curriculos={curriculos} />
    </section>
  );
}
