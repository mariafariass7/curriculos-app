export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/90 py-6 text-center text-sm text-slate-600 shadow-soft">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        © {new Date().getFullYear()} Currículos App — sistema de cadastro e visualização de currículos.
      </div>
    </footer>
  );
}
