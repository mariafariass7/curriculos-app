'use client';

import { useRouter } from 'next/navigation';
import { useCurriculos } from '../../../../../hooks/useCurriculos';
import FormCurriculo from '../../../../../components/curriculos/FormCurriculo';
import type { Curriculo } from '../../../../../lib/types';
import { generateId } from '../../../../../lib/utils';

export default function NovoCurriculoPage() {
  const router = useRouter();
  const { addCurriculo } = useCurriculos();

  async function handleSave(curriculo: Curriculo) {
    addCurriculo({ ...curriculo, id: curriculo.id || generateId() });
    router.push('/sistema/paginas/curriculos');
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Novo currículo</p>
        <h1 className="text-3xl font-semibold text-slate-950">Cadastro de novo currículo</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          Preencha os dados abaixo e clique em salvar para adicionar um novo currículo ao sistema.
        </p>
      </div>

      <FormCurriculo onSave={handleSave} />
    </section>
  );
}
