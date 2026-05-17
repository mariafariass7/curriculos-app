'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMail, FiPhone, FiUser, FiClipboard, FiStar } from 'react-icons/fi';
import { loadCurriculos } from '../../../../../lib/storage';
import type { Curriculo } from '../../../../../lib/types';

interface CurriculoParams {
  params: {
    id: string;
  };
}

export default function CurriculoDetalhePage({ params }: CurriculoParams) {
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);

  useEffect(() => {
    const all = loadCurriculos();
    const entry = all.find((item) => item.id === params.id) || null;
    setCurriculo(entry);
  }, [params.id]);

  if (!curriculo) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-950">Currículo não encontrado</h1>
        <p className="mt-3 text-sm text-slate-600">Verifique o ID ou retorne para a lista de currículos.</p>
        <Link
          href="/sistema/paginas/curriculos"
          className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Voltar para a lista
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Detalhes do currículo</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Visualizar currículo</h1>
          </div>
          <Link
            href="/sistema/paginas/curriculos"
            className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Voltar para a lista
          </Link>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[2rem] bg-slate-100 text-2xl font-semibold text-slate-700">
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
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{curriculo.cargo}</p>
                <h1 className="text-4xl font-semibold text-slate-950">{curriculo.nome}</h1>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FiMail /> E-mail
                </p>
                <p className="mt-2 text-sm text-slate-600">{curriculo.email}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FiPhone /> Telefone
                </p>
                <p className="mt-2 text-sm text-slate-600">{curriculo.telefone}</p>
              </div>
              <div className="sm:col-span-2 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FiUser /> CPF
                </p>
                <p className="mt-2 text-sm text-slate-600">{curriculo.cpf}</p>
              </div>
            </div>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Resumo profissional</h2>
              <p className="text-sm leading-7 text-slate-600">{curriculo.resumo}</p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Experiências</h2>
              <div className="space-y-4">
                {curriculo.experiencias.map((item, index) => (
                  <div key={`${item.empresa}-${index}`} className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="font-semibold text-slate-900">{item.cargo} — {item.empresa}</p>
                    <p className="text-sm text-slate-500">{item.periodo}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.descricao}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Formações</h2>
              <div className="space-y-4">
                {curriculo.formacoes.map((item, index) => (
                  <div key={`${item.instituicao}-${index}`} className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="font-semibold text-slate-900">{item.curso}</p>
                    <p className="text-sm text-slate-500">{item.instituicao}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.periodo}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <FiClipboard /> Competências
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {curriculo.habilidades.map((habilidade) => (
                  <span key={habilidade} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {habilidade}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Dica</p>
              <p className="mt-2 leading-6">Use o botão de editar para atualizar o histórico profissional e inclua uma imagem no cadastro.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
