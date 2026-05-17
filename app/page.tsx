import Link from 'next/link';
import { FiArrowRight, FiUsers, FiShield, FiStar } from 'react-icons/fi';

export default function Home() {
  return (
    <section className="space-y-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Bem-vindo ao Currículos App</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Gestão de currículos com cadastro, filtro e visualização detalhada.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Crie currículos completos, filtre por nome ou cargo e visualize todos os detalhes diretamente no navegador.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              <FiUsers /> Lista de currículos
            </span>
            <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              <FiShield /> Validação com Yup
            </span>
            <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              <FiStar /> Upload fake de imagem
            </span>
          </div>
          <Link
            href="/sistema/paginas/curriculos"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Entrar no sistema
            <FiArrowRight />
          </Link>
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Interface intuitiva</p>
          <h2 className="mt-4 text-3xl font-semibold">Todas as etapas do currículo em um só lugar</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <li>• Cadastro completo com validação</li>
            <li>• Busca em tempo real por nome ou cargo</li>
            <li>• Visualização de detalhes e experiências</li>
            <li>• Persistência local em localStorage</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
