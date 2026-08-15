'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroFlowMountainsDetailedNoPV } from "@/components/HeroFlowMountainsDetailedNoPV";

import { 
  MessageSquare, 
  FileSpreadsheet, 
  BarChart3, 
  Bot, 
  Bell, 
  ShieldCheck,
  Zap,
  Smartphone,
  PieChart,
  Lock,
  ArrowRight
} from "lucide-react";

const featureCards = [
  { id: 1, icon: MessageSquare, title: "Controlo via WhatsApp", description: "Regista gastos e rendimentos diretamente pelo WhatsApp." },
  { id: 2, icon: FileSpreadsheet, title: "Leitor de Extratos CSV", description: "Importa ficheiros bancários em segundos com categorização inteligente." },
  { id: 3, icon: BarChart3, title: "Gráficos e Analíticos", description: "Visualiza relatórios dinâmicos do teu saldo e despesas." },
  { id: 4, icon: Bot, title: "Assistente IA", description: "Recebe conselhos e resumos financeiros automáticos." },
  { id: 5, icon: Bell, title: "Alertas Automáticos", description: "Notificações sobre orçamentos ultrapassados e contas." },
  { id: 6, icon: ShieldCheck, title: "Segurança Avançada", description: "Dados encriptados sob rígidos padrões de privacidade." },
];

const marqueeServices = [
  { icon: Smartphone, title: "Lançamento Instantâneo", badge: "WhatsApp" },
  { icon: PieChart, title: "Orçamentos Flexíveis", badge: "Gestão" },
  { icon: Zap, title: "Automação com IA", badge: "Inteligência" },
  { icon: Lock, title: "Encriptação End-to-End", badge: "Segurança" },
  { icon: BarChart3, title: "Relatórios Exportáveis", badge: "Analytics" },
  { icon: FileSpreadsheet, title: "Importação de Extratos", badge: "CSV / PDF" },
];

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 text-gray-800 overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="w-full max-w-6xl px-4 mx-auto flex flex-col-reverse md:flex-row items-center justify-between min-h-[600px] lg:min-h-[680px] pt-12 md:pt-0">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col items-start gap-4 text-left mt-8 md:mt-0 mb-18 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            O teu gestor financeiro está mais próximo e fácil de ti.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            O teu controlo financeiro nunca foi tão intuitivo, rápido e otimizado. Tudo num único lugar.
          </p>
          <div className="flex flex-row gap-4 mt-4">
            <Link
              href="/login"
              className="px-6 py-3 rounded-full bg-[#431880] text-white font-medium hover:bg-[#341266] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Começar agora
            </Link>
            <Link
              href="#sobre"
              className="px-6 py-3 rounded-full bg-white text-gray-800 font-medium border border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Saber mais
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroFlowMountainsDetailedNoPV className="w-[500px] px-6 md:px-0" />
        </motion.div>
      </section>

      {/* --- RECURSOS / SOBRE --- */}
      <section id="sobre" className="w-full flex flex-col items-center max-w-6xl px-4 mx-auto py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl flex flex-col items-center gap-3"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Tudo o que precisas para <span className="text-[#431880]">organizar as tuas finanças</span>
          </h2>
          <p className="text-lg text-gray-600">
            Gere o teu dinheiro via WhatsApp, importa extratos CSV e analisa gráficos interativos com facilidade.
          </p>
        </motion.div>

        {/* Seção de Funcionalidades com Efeito Hover Moderno */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featureCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg border border-gray-200/90  transition-all duration-300 flex flex-col gap-3 overflow-hidden cursor-pointer items-center justify-center"
              >
               
                
                <div className="w-12 h-12 rounded-xl bg-[#431880]/10 text-[#431880] group-hover:bg-[#431880] group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <Icon className="w-6 h-6 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-center text-gray-800 group-hover:text-[#431880] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed text-center">{item.description}</p>
              </motion.div>
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
            {[
              { step: "1", title: "Cria a tua Conta", desc: "Regista-te em menos de 1 minuto na nossa plataforma." },
              { step: "2", title: "Lança as tuas Transações", desc: "Importa o teu ficheiro CSV ou envia uma mensagem no WhatsApp." },
              { step: "3", title: "Acompanha os Resultados", desc: "Visualiza o teu painel com relatórios e dicas automáticas." }
            ].map((st, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex flex-col items-center gap-2 p-8 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#431880]/10 text-[#431880] font-bold text-xl">
                  {st.step}
                </span>
                <h3 className="text-lg font-semibold mt-2">{st.title}</h3>
                <p className="text-gray-500 text-sm">{st.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVIÇOS & CARROSSEL INFINITO (MARQUEE HORIZONTAL) --- */}
      <section id="servicos" className="w-full bg-gray-900 text-white py-20 overflow-hidden relative">
        <div className="max-w-4xl px-4 mx-auto flex flex-col items-center text-center mb-12">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#431880] text-purple-200 border border-purple-500/30 mb-4">
            Recursos Em Destaque
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">Pronto para transformar a tua vida financeira?</h2>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl">
            Junta-te ao FlowingCash hoje mesmo e tem visibilidade clara do teu orçamento sem complicação.
          </p>
        </div>

        {/* Marquee Horizontal (Carrossel Contínuo) */}
        <div className="w-full flex overflow-hidden mask-linear-gradient relative py-4">
          <motion.div 
            className="flex gap-6 whitespace-nowrap min-w-full"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...marqueeServices, ...marqueeServices].map((srv, idx) => {
              const SrvIcon = srv.icon;
              return (
                <div 
                  key={idx}
                  className="flex items-center gap-4 bg-gray-800/80 backdrop-blur-md border border-gray-700/80 px-6 py-4 rounded-2xl shadow-lg shrink-0 hover:border-[#431880] hover:bg-gray-800 transition-all cursor-pointer group"
                >
                  <div className="p-3 rounded-xl bg-[#431880]/30 text-purple-300 group-hover:bg-[#431880] group-hover:text-white transition-colors">
                    <SrvIcon size={22} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-purple-400 font-semibold">{srv.badge}</span>
                    <span className="text-base font-medium text-gray-100">{srv.title}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Botão de Chamada para Ação */}
        <div className="flex justify-center mt-12">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#431880] hover:bg-[#531fa0] text-white font-semibold text-lg shadow-xl shadow-[#431880]/30 transition-all hover:scale-105"
          >
            Começar Grátis
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-gray-900 border-t border-gray-800 py-8 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} FlowingCash. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  );
}
