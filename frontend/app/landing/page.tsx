'use client'

import Link from "next/link";
import { HeroFlowMountainsDetailedNoPV } from "@/components/HeroFlowMountainsDetailedNoPV"

import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  LogOut, 
  MessageSquare, 
  FileSpreadsheet, 
  BarChart3, 
  Bot, 
  Bell, 
  ShieldCheck 
} from "lucide-react";

const featureCards = [
  { id: 1, icon: MessageSquare, title: "Controlo via WhatsApp", description: "Regista gastos e rendimentos diretamente pelo WhatsApp." },
  { id: 2, icon: FileSpreadsheet, title: "Leitor de Extratos CSV", description: "Importa ficheiros bancários em segundos com categorização inteligente." },
  { id: 3, icon: BarChart3, title: "Gráficos e Analíticos", description: "Visualiza relatórios dinâmicos do teu saldo e despesas." },
  { id: 4, icon: Bot, title: "Assistente IA", description: "Recebe conselhos e resumos financeiros automáticos." },
  { id: 5, icon: Bell, title: "Alertas Automáticos", description: "Notificações sobre orçamentos ultrapassados e contas." },
  { id: 6, icon: ShieldCheck, title: "Segurança Avançada", description: "Dados encriptados sob rígidos padrões de privacidade." },
];

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 text-gray-800 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section id="inicio" className="w-full max-w-6xl px-4 mx-auto flex flex-col-reverse md:flex-row items-center justify-between min-h-[600px] lg:min-h-[680px] pt-12 md:pt-0">
        <div className="w-full md:w-1/2 flex flex-col items-start gap-4 text-left mt-8 md:mt-0 mb-18 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            O teu gestor financeiro está mais próximo e fácil de ti.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            O teu controlo financeiro nunca foi tão intuitivo, rápido e otimizado. Tudo num único lugar.
          </p>
          <div className="flex flex-row gap-4 mt-4">
            <Link
              href="/login"
              className="px-6 py-3 rounded-full bg-[#431880] text-white font-medium hover:bg-[#341266] shadow-md transition-all duration-300"
            >
              Começar agora
            </Link>
            <Link
              href="#sobre"
              className="px-6 py-3 rounded-full bg-white text-gray-800 font-medium border border-gray-300 hover:bg-gray-100 shadow-sm transition-all duration-300"
            >
              Saber mais
            </Link>
          </div>
        </div>

        <HeroFlowMountainsDetailedNoPV className=" w-[500px] px-6 md:px-0" />
      </section>

      {/* --- RECURSOS / SOBRE --- */}
      <section id="sobre" className="w-full flex flex-col items-center max-w-6xl px-4 mx-auto py-20">
        <div className="text-center max-w-2xl flex flex-col items-center gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Tudo o que precisas para <span className="text-[#431880]">organizar as tuas finanças</span>
          </h2>
          <p className="text-lg text-gray-600">
            Gere o teu dinheiro via WhatsApp, importa extratos CSV e analisa gráficos interativos com facilidade.
          </p>
        </div>

        {/* Seção de Funcionalidades */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featureCards.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-200 transition-all flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#431880]/10 text-[#431880] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      
      </section>

      {/* --- COMO FUNCIONA --- */}
      <section id="como-funciona" className="w-full bg-white py-20 border-y border-gray-200">
        <div className="max-w-6xl px-4 mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Saiba como <span className="text-[#431880]">tudo funciona</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mt-3">
            Em apenas 3 passos simples, assume o controlo total do teu património.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 w-full">
            <div className="flex flex-col items-center gap-2 p-4">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#431880]/10 text-[#431880] font-bold text-xl">1</span>
              <h3 className="text-lg font-semibold mt-2">Cria a tua Conta</h3>
              <p className="text-gray-500 text-sm">Regista-te em menos de 1 minuto na nossa plataforma.</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#431880]/10 text-[#431880] font-bold text-xl">2</span>
              <h3 className="text-lg font-semibold mt-2">Lança as tuas Transações</h3>
              <p className="text-gray-500 text-sm">Importa o teu ficheiro CSV ou envia uma mensagem no WhatsApp.</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#431880]/10 text-[#431880] font-bold text-xl">3</span>
              <h3 className="text-lg font-semibold mt-2">Acompanha os Resultados</h3>
              <p className="text-gray-500 text-sm">Visualiza o teu painel com relatórios e dicas automáticas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA / FOOTER CONTACT --- */}
      <section id="servicos" className="w-full bg-gray-800 text-white py-20 mt-10">
        <div className="max-w-4xl px-4 mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Pronto para transformar a tua vida financeira?</h2>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl">
            Junta-te ao FlowingCash hoje mesmo e tem visibilidade clara do teu orçamento sem complicação.
          </p>
          <Link
            href="/register"
            className="mt-8 px-8 py-3.5 rounded-full bg-[#431880] hover:bg-[#531fa0] text-white font-medium text-lg shadow-lg transition-all"
          >
            Começar Grátis
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-gray-800 border-t border-gray-700 py-8 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} FlowingCash. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  );
}
