'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";
import Image from "next/image"
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
            
            // 2. ADICIONA ESTA LINHA: Grava o token nos cookies (expira em 7 dias)
	    const maxAge = 7 * 24 * 60 * 60; // 7 dias em segundos
	    document.cookie = `token=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
            
            router.push(`/dashboard`)
        } catch (error: any) {
            setErrorMessage("Erro de conexão com o servidor.")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-100 antialiased">
            
            {/* PAINEL ESQUERDO: Publicidade / Proposta de Valor (Visível apenas em Desktop) */}
            <div className="hidden md:flex relative w-1/2 min-h-screen p-12 flex-col justify-between overflow-hidden bg-[#431880]/50">
                {/* Imagem de Fundo Decorativa */}
            
                <Image 
		    src="/login-bg.jpeg" // Caminho relativo à pasta public
		    alt="Financial Background"
		    fill
		    priority
		    className="object-cover opacity-40 mix-blend-luminosity"
		/>
				
                {/* Camada Transparente com Blur para Contraste do Texto */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-purple-950/20 to-slate-950/90 backdrop-blur-[2px] z-10" />

                {/* Conteúdo Superior */}
                <div className="relative z-20">
                    <Link 
                        href="/landing" 
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                        Voltar 
                    </Link>
                </div>

                {/* Conteúdo Central: Cópia Publicitária */}
                <div className="relative z-20 max-w-lg mb-12">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-800/80 text-slate-200 border border-purple-500/20 mb-4">
                        FlowingCash Ecosystem
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-4">
                        Tome o controlo do seu <span className="text-white">fluxo financeiro</span>.
                    </h2>
                    <p className="text-base lg:text-lg text-slate-300 font-normal leading-relaxed">
                        Centralize as suas despesas, monitorize economias em tempo real e utilize inteligência artificial para otimizar o seu património a partir de um único painel.
                    </p>
                </div>
            </div>

            {/* PAINEL DIREITO: Formulário de Autenticação */}
            <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 bg-slate-50">
                <div className="w-full max-w-[440px] bg-white flex flex-col px-8 py-12 rounded-2xl border border-slate-200/80 shadow-sm">
                    
                    {/* Logotipo e Header */}
                    <div className="flex flex-col items-center mb-8">
                        <FlowingCashLogo iconOnly={true} className="justify-center mb-4 scale-110"/>
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Bem-vindo de volta!</h3>
                        <p className="text-sm text-slate-500 mt-1 text-center">Aceda à sua conta com as suas credenciais</p>
                    </div>
                   
                    {/* Estados de Feedback */}
                    {errorMessage && (
                        <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-sm text-red-600 animate-in fade-in slide-in-from-top-2 duration-200">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-5 p-3 rounded-xl bg-green-50 border border-green-100 flex items-start gap-2.5 text-sm text-green-600 animate-in fade-in slide-in-from-top-2 duration-200">
                            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Formulário */}
                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Email</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3.5 text-slate-400" size={18} />
                                <input 
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email}
                                    type="email" 
                                    placeholder="seu.email@exemplo.com" 
                                    required 
                                    className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all focus:ring-2 focus:ring-purple-500/10"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Palavra-passe</label>
                                <Link href="/forgot-password" className="text-xs font-semibold text-purple-600 hover:text-purple-700">
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
                                    className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-11 pr-11 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all focus:ring-2 focus:ring-purple-500/10"
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
                            className="w-full bg-[#431880] hover:bg-[#341266] text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed mt-3 flex items-center justify-center gap-2"
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
                            <Link href="/register" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                                Criar conta gratuita
                            </Link>
                        </p>
                    </div>
                </div>
            </div>   
        </div>
    )
}
