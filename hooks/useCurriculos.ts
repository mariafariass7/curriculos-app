'use client';

import { useEffect, useState } from 'react';
import { loadCurriculos, saveCurriculos } from '../lib/storage';
import type { Curriculo } from '../lib/types';

const SAMPLE_CURRICULOS: Curriculo[] = [
  {
    id: '1',
    nome: 'Mariana Sousa',
    cargo: 'Desenvolvedora Front-end',
    email: 'mariana.sousa@example.com',
    telefone: '(11) 91234-5678',
    cpf: '123.456.789-00',
    resumo: 'Profissional com 4 anos de experiência em React, Next.js e interfaces acessíveis.',
    fotoUrl: '',
    experiencias: [
      {
        empresa: 'Agência Tech',
        cargo: 'Front-end Developer',
        periodo: '2022 - 2024',
        descricao: 'Desenvolvimento de aplicações web usando React e integração com APIs REST.',
      },
    ],
    formacoes: [
      {
        instituicao: 'Universidade Federal',
        curso: 'Ciência da Computação',
        periodo: '2018 - 2022',
      },
    ],
    habilidades: ['React', 'Next.js', 'HTML', 'CSS', 'JavaScript'],
  },
   {
    id: '2',
    nome: 'Lucas Ferreira',
    cargo: 'UX/UI Designer',
    email: 'lucas.ferreira@example.com',
    telefone: '(21) 99876-5432',
    cpf: '987.654.321-00',
    resumo: 'Designer focado em experiência do usuário, prototipação e interfaces modernas.',
    fotoUrl: '',
    experiencias: [
      {
        empresa: 'Creative Studio',
        cargo: 'UX Designer',
        periodo: '2021 - 2024',
        descricao: 'Criação de fluxos de navegação, wireframes e design systems.',
      },
    ],
    formacoes: [
      {
        instituicao: 'PUC Rio',
        curso: 'Design Digital',
        periodo: '2017 - 2021',
      },
    ],
    habilidades: ['Figma', 'UX Research', 'UI Design', 'Adobe XD'],
  },

  {
    id: '3',
    nome: 'Ana Clara Martins',
    cargo: 'Analista de Dados',
    email: 'ana.clara@example.com',
    telefone: '(31) 97777-1111',
    cpf: '456.789.123-55',
    resumo: 'Especialista em análise de dados, dashboards e automação de relatórios.',
    fotoUrl: '',
    experiencias: [
      {
        empresa: 'DataVision',
        cargo: 'Data Analyst',
        periodo: '2020 - 2024',
        descricao: 'Criação de dashboards interativos e análise estratégica de métricas.',
      },
    ],
    formacoes: [
      {
        instituicao: 'UFMG',
        curso: 'Sistemas de Informação',
        periodo: '2016 - 2020',
      },
    ],
    habilidades: ['Power BI', 'SQL', 'Python', 'Excel'],
  },

  {
    id: '4',
    nome: 'Gabriel Oliveira',
    cargo: 'Desenvolvedor Back-end',
    email: 'gabriel.oliveira@example.com',
    telefone: '(41) 96666-2222',
    cpf: '741.852.963-10',
    resumo: 'Desenvolvedor especializado em APIs REST, Node.js e bancos de dados.',
    fotoUrl: '',
    experiencias: [
      {
        empresa: 'Cloud Systems',
        cargo: 'Back-end Developer',
        periodo: '2019 - 2024',
        descricao: 'Desenvolvimento de APIs escaláveis e manutenção de microsserviços.',
      },
    ],
    formacoes: [
      {
        instituicao: 'UTFPR',
        curso: 'Engenharia de Software',
        periodo: '2015 - 2019',
      },
    ],
    habilidades: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
  }
];

export function useCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = loadCurriculos();
    return stored.length ? stored : SAMPLE_CURRICULOS;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = loadCurriculos();
    if (!stored.length) {
      saveCurriculos(curriculos);
    }
  }, []);

  function saveList(updated: Curriculo[]) {
    setCurriculos(updated);
    saveCurriculos(updated);
  }

  function addCurriculo(entry: Curriculo) {
    const next = [entry, ...curriculos];
    saveList(next);
  }

  function updateCurriculo(entry: Curriculo) {
    const next = curriculos.map((item) => (item.id === entry.id ? entry : item));
    saveList(next);
  }

  function removeCurriculo(id: string) {
    const next = curriculos.filter((curriculo) => curriculo.id !== id);
    saveList(next);
  }

  return {
    curriculos,
    addCurriculo,
    updateCurriculo,
    removeCurriculo,
    saveList,
  };
}
