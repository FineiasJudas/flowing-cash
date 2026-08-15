'use client'

import { useState } from "react"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"
import Link from "next/link";
import { FlowingCashLogo } from "@/components/FlowingCashLogo"
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    
    const handleLoginSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")
        
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            
            if (!response.ok) {
                setErrorMessage(response.statusText || "Credenciais incorretas.")
                return
            }
            
            const data = await response.json()
            const { token, user } = data;
            
            setSuccessMessage("Login efetuado com sucesso!")
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            const maxAge = 7 * 24 * 60 * 60; // 7 dias
            document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
            
            router.push(`/dashboard`)
        } catch (error: any) {
            setErrorMessage("Erro de conexão com o servidor.")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row antialiased bg-slate-100/80">
            
            {/* PAINEL ESQUERDO: Publicidade Harmonizada (Slate & Soft Purple) */}
            <div className="hidden md:flex relative w-1/2 min-h-screen p-12 lg:p-16 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-200/60 via-slate-100 to-purple-100/50">
                
                {/* Elementos Decorativos em Tons Slate e Púrpura */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-slate-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />

                {/* Botão Voltar */}
                
                <motion.div 
                	  initial={{ opacity: 0, y: 20 }}
			  whileInView={{ opacity: 1, y: 0 }}
			  viewport={{ once: true }}
			  transition={{ duration: 1.3 }}
                 className="relative z-10">
                    <Link 
                        href="/landing"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#431880] transition-colors group px-4 py-2 rounded-xl backdrop-blur-md "
                    >
                        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                        Voltar 
                    </Link>
                </motion.div>

                {/* Card de Conteúdo Publicitário (Estilo Glassmorphism com Tom Slate) */}
                <motion.div 
                	  initial={{ opacity: 0, y: 20 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  transition={{ duration: 0.5 }}
                className="max-w-lg mb-8 lg:p-10 backdrop-blur-md">
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-violet-950 text-gray-100 border border-gray-700/30 mb-6">
                        FlowingCash Ecosystem
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15] mb-5">
                        Tome o controlo do seu <span className="text-[#431880]">fluxo financeiro</span>.
                    </h2>
                    <p className="text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
                        Centralize as suas despesas, monitorize economias em tempo real e utilize inteligência artificial para otimizar o seu património a partir de um único painel.
                    </p>
                </motion.div>

                {/* Rodapé do Painel */}
                
                <motion.div 
                	  initial={{ opacity: 0, y: 20 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  transition={{ duration: 1 }}
                 className="relative z-10 text-xs font-medium text-slate-500">
                    © FlowingCash. Gestão financeira inteligente.
                </motion.div>
            </div>

            {/* PAINEL DIREITO: Formulário de Autenticação */}
            <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 lg:p-12">
                
                <motion.div 
                	  initial={{ opacity: 0, y: 20 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  transition={{ duration: 0.8 }}
                 className="w-full max-w-[440px] bg-white flex flex-col px-8 py-10 sm:px-10 sm:py-12 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200">
                    
                    {/* Logotipo e Header */}
                    <div className="flex flex-col items-center mb-8">
                        <FlowingCashLogo iconOnly={true} className="justify-center mb-4 scale-110"/>
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Bem-vindo de volta!</h3>
                        <p className="text-sm text-slate-500 mt-1 text-center">Aceda à sua conta com as suas credenciais</p>
                    </div>
                   
                    {/* Estados de Feedback */}
                    {errorMessage && (
                        <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200/80 flex items-start gap-2.5 text-sm text-red-600 animate-in fade-in slide-in-from-top-2 duration-200">
                            <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5 text-sm text-emerald-600 animate-in fade-in slide-in-from-top-2 duration-200">
                            <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-500" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Formulário */}
                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Email</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3.5 text-slate-400" size={18} />
                                <input 
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email}
                                    type="email" 
                                    placeholder="seu.email@exemplo.com" 
                                    required 
                                    className="w-full rounded-xl bg-slate-100 border border-slate-300 pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#431880] focus:bg-white transition-all focus:ring-2 focus:ring-[#431880]/10"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Palavra-passe</label>
                                <Link href="/forgot-password" className="text-xs font-semibold text-[#431880] hover:underline">
                                    Esqueceu-se?
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-3.5 text-slate-400" size={18} />
                                <input 
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password}
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    required 
                                    className="w-full rounded-xl  bg-slate-100 border border-slate-300 pl-11 pr-11 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#431880] focus:bg-white transition-all focus:ring-2 focus:ring-[#431880]/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full bg-[#431880] hover:bg-[#341266] text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md shadow-[#431880]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-3 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    A entrar...
                                </>
                            ) : 'Entrar na Conta'}
                        </button>
                    </form>

                    {/* Footer do Card */}
                    <div className="mt-8 text-center pt-5 border-t border-slate-100">
                        <p className="text-sm text-slate-500">
                            Ainda não tem conta?{" "}
                            <Link href="/register" className="font-semibold text-[#431880] hover:underline">
                                Criar conta gratuita
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>   
        </div>
    )
}


