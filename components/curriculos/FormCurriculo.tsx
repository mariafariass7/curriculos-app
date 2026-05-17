'use client';

import { useMemo, useState, type ChangeEvent } from 'react';
import { Controller, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { toast, Toaster } from 'sonner';

import type { Curriculo } from '../../lib/types';
import { generateId, initialCurriculo, parseHabilidades } from '../../lib/utils';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório'),
  cargo: yup.string().required('O cargo é obrigatório'),
  email: yup.string().email('Email inválido').required('O e-mail é obrigatório'),
  telefone: yup.string().required('O telefone é obrigatório'),
  cpf: yup.string().required('O CPF é obrigatório'),
  resumo: yup.string().required('O resumo é obrigatório'),
  fotoUrl: yup.string().optional(),
  experiencias: yup
    .array()
    .of(
      yup.object({
        empresa: yup.string().required('Empresa é obrigatória'),
        cargo: yup.string().required('Cargo é obrigatório'),
        periodo: yup.string().required('Período é obrigatório'),
        descricao: yup.string().required('Descrição é obrigatória'),
      })
    )
    .min(1, 'Adicione ao menos uma experiência'),
  formacoes: yup
    .array()
    .of(
      yup.object({
        instituicao: yup.string().required('Instituição é obrigatória'),
        curso: yup.string().required('Curso é obrigatório'),
        periodo: yup.string().required('Período é obrigatório'),
      })
    )
    .min(1, 'Adicione ao menos uma formação'),
  habilidades: yup.string().required('Informe ao menos uma habilidade'),
});

type FormValues = Omit<Curriculo, 'habilidades'> & {
  habilidades: string;
};

interface Props {
  defaultValues?: Curriculo;
  onSave: (c: Curriculo) => void;
}

export default function FormCurriculo({ defaultValues, onSave }: Props) {
  const [preview, setPreview] = useState<string>(defaultValues?.fotoUrl ?? '');

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema as any),
    defaultValues: defaultValues
      ? { ...defaultValues, habilidades: defaultValues.habilidades.join(', ') }
      : { ...initialCurriculo(), habilidades: '' },
  });

  const experiencias = useFieldArray({ control, name: 'experiencias' });
  const formacoes = useFieldArray({ control, name: 'formacoes' });

  const errorCount = useMemo(() => Object.keys(errors).length, [errors]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const curriculo: Curriculo = {
      ...data,
      id: data.id || generateId(),
      habilidades: parseHabilidades(data.habilidades),
      fotoUrl: data.fotoUrl || preview,
    };

    onSave(curriculo);
    toast.success('Currículo salvo com sucesso!');
  };

  const onError = () => {
    if (errorCount > 0) {
      toast.error('Corrija os campos obrigatórios e tente novamente.');
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview('');
      setValue('fotoUrl', '');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setPreview(url);
      setValue('fotoUrl', url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
      <Toaster position="top-right" richColors />

      <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Informações pessoais</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Dados do candidato</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Preencha os dados pessoais e profissionais do candidato. Campos com * são obrigatórios.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-900">Preview da foto</p>
          <div className="mt-4 flex h-32 items-center justify-center overflow-hidden rounded-3xl bg-slate-100">
            {preview ? (
              <img src={preview} alt="Prévia da foto" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-slate-500">Nenhuma imagem selecionada</span>
            )}
          </div>
          <label className="mt-5 flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 transition hover:border-slate-400 hover:text-slate-900">
            <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
            Selecionar imagem fake
          </label>
          <p className="mt-3 text-xs text-slate-500">A imagem será carregada apenas localmente para exibição no currículo.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-900">Nome *</label>
            <input
              {...register('nome')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Nome completo"
            />
            {errors.nome && <p className="mt-2 text-sm text-rose-600">{errors.nome.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900">Cargo *</label>
            <input
              {...register('cargo')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Cargo desejado"
            />
            {errors.cargo && <p className="mt-2 text-sm text-rose-600">{errors.cargo.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900">Email *</label>
            <input
              {...register('email')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Email profissional"
            />
            {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900">Telefone *</label>
            <input
              {...register('telefone')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="(00) 00000-0000"
            />
            {errors.telefone && <p className="mt-2 text-sm text-rose-600">{errors.telefone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900">CPF *</label>
            <input
              {...register('cpf')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="000.000.000-00"
            />
            {errors.cpf && <p className="mt-2 text-sm text-rose-600">{errors.cpf.message}</p>}
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-slate-900">Resumo *</label>
            <textarea
              {...register('resumo')}
              className="mt-2 h-28 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="Escreva um breve resumo profissional"
            />
            {errors.resumo && <p className="mt-2 text-sm text-rose-600">{errors.resumo.message}</p>}
          </div>
        </div>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Experiências</h2>
              <p className="text-sm text-slate-600">Adicione sua experiência profissional.</p>
            </div>
            <button
              type="button"
              onClick={() => experiencias.append({ empresa: '', cargo: '', periodo: '', descricao: '' })}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + Experiência
            </button>
          </div>

          {experiencias.fields.map((f, i) => (
            <div key={f.id} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Empresa
                  <input
                    {...register(`experiencias.${i}.empresa` as const)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Nome da empresa"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-900">
                  Cargo
                  <input
                    {...register(`experiencias.${i}.cargo` as const)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Título do cargo"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Período
                  <input
                    {...register(`experiencias.${i}.periodo` as const)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Ex: 2022 - 2024"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-900">
                  Descrição
                  <textarea
                    {...register(`experiencias.${i}.descricao` as const)}
                    className="mt-2 h-24 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Detalhe as suas atividades"
                  />
                </label>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Formações</h2>
              <p className="text-sm text-slate-600">Adicione sua formação acadêmica.</p>
            </div>
            <button
              type="button"
              onClick={() => formacoes.append({ instituicao: '', curso: '', periodo: '' })}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + Formação
            </button>
          </div>

          {formacoes.fields.map((f, i) => (
            <div key={f.id} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Instituição
                  <input
                    {...register(`formacoes.${i}.instituicao` as const)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Nome da instituição"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-900">
                  Curso
                  <input
                    {...register(`formacoes.${i}.curso` as const)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Nome do curso"
                  />
                </label>
              </div>
              <label className="block text-sm font-semibold text-slate-900">
                Período
                <input
                  {...register(`formacoes.${i}.periodo` as const)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  placeholder="Ex: 2020 - 2024"
                />
              </label>
            </div>
          ))}
        </section>

        <div>
          <label className="block text-sm font-semibold text-slate-900">Habilidades *</label>
          <input
            {...register('habilidades')}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Ex: React, CSS, Figma"
          />
          {errors.habilidades && <p className="mt-2 text-sm text-rose-600">{errors.habilidades.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
