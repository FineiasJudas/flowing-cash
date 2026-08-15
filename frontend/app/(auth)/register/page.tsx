'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";
import { FlowingCashLogo } from "@/components/FlowingCashLogo"
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const handleRegisterSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")
        setSuccessMessage("")
        
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })
            
            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                setErrorMessage(data.message || "Erro ao criar conta. Tente novamente.")
                return
            }
            
            setSuccessMessage("Conta criada com sucesso! Redirecionando...")
            
            setTimeout(() => {
                router.push('/login')
            }, 1500)
            
        } catch (error: any) {
            setErrorMessage("Erro de conexão com o servidor.")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row antialiased bg-slate-100/80">
            
            {/* PAINEL ESQUERDO: Formulário de Registo */}
            <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-[440px] bg-white flex flex-col px-8 py-10 sm:px-10 sm:py-12 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200">
                    
                    {/* Logotipo e Header */}
                    <div className="flex flex-col items-center mb-8">
                        <FlowingCashLogo iconOnly={true} className="justify-center mb-4 scale-110"/>
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Criar Conta Gratuita</h3>
                        <p className="text-sm text-slate-500 mt-1 text-center">Preencha os seus dados para começar</p>
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
                    <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Nome Completo</label>
                            <div className="relative flex items-center">
                                <User className="absolute left-3.5 text-slate-400" size={18} />
                                <input 
                                    onChange={e => setName(e.target.value)} 
                                    value={name}
                                    type="text" 
                                    placeholder="O seu nome" 
                                    required 
                                    className="w-full rounded-xl bg-slate-100 border border-slate-300 pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#431880] focus:bg-white transition-all focus:ring-2 focus:ring-[#431880]/10"
                                />
                            </div>
                        </div>

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
                            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Palavra-passe</label>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-3.5 text-slate-400" size={18} />
                                <input 
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password}
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    required 
                                    className="w-full rounded-xl bg-slate-100 border border-slate-300 pl-11 pr-11 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#431880] focus:bg-white transition-all focus:ring-2 focus:ring-[#431880]/10"
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
                                    A criar conta...
                                </>
                            ) : 'Criar Conta'}
                        </button>
                    </form>

                    {/* Footer do Card */}
                    <div className="mt-8 text-center pt-5 border-t border-slate-100">
                        <p className="text-sm text-slate-500">
                            Já tem uma conta?{" "}
                            <Link href="/login" className="font-semibold text-[#431880] hover:underline">
                                Iniciar sessão
                            </Link>
                        </p>
                    </div>
                </div>
            </div>   

            {/* PAINEL DIREITO: Publicidade Harmonizada (Slate & Soft Purple) */}
            <div className="hidden md:flex relative w-1/2 min-h-screen p-12 lg:p-16 flex-col justify-between overflow-hidden bg-gradient-to-bl from-slate-200/60 via-slate-100 to-purple-100/50 ">
                
                {/* Elementos Decorativos em Tons Slate e Púrpura */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-slate-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />

                {/* Botão Voltar */}
                <div className="flex w-full justify-end relative z-10">
                    <Link 
                        href="/landing" 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#431880] transition-colors group px-4 py-2 rounded-xl backdrop-blur-md"
                    >
                        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                        Voltar 
                    </Link>
                </div>

                {/* Card de Conteúdo Publicitário */}
                <div className="relative z-10 max-w-lg mb-8 lg:p-10 backdrop-blur-md">
                     <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-gray-500 text-gray-200 border border-gray-700/30 mb-6">
                        FlowingCash Ecosystem
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15] mb-5">
                        A sua jornada para a <span className="text-[#431880]">liberdade financeira</span> começa aqui.
                    </h2>
                    <p className="text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
                        Crie a sua conta gratuita em poucos segundos e comece a rastrear os seus orçamentos e despesas com praticidade e inteligência.
                    </p>
                </div>

                {/* Rodapé do Painel */}
                <div className="relative z-10 left-8 text-xs font-medium text-slate-500">
                    © FlowingCash. Gestão financeira inteligente.
                </div>
            </div>

        </div>
    )
}
