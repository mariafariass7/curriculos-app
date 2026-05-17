export type Experiencia = {
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
};

export type Formacao = {
  instituicao: string;
  curso: string;
  periodo: string;
};

export type Curriculo = {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  fotoUrl?: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  habilidades: string[];
};
