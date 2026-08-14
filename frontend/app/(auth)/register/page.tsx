'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image"; // Importante para o fundo!
import { FlowingCashLogo } from "@/components/FlowingCashLogo"
import { Eye, EyeOff, Lock, Mail, ArrowLeft, AlertCircle, CheckCircle2, User } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handlerRegisterSubmit = async (e: React.FormEvent) => {
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
            
            const data = await response.json()
            
            if (!response.ok) {
                setErrorMessage(data.message || "Ocorreu um erro ao criar a conta.")         
                return
            }

            setSuccessMessage(data.message || "Conta criada com sucesso!")
            
            setTimeout(() => {
                router.push("/login")            
            }, 1500)
            
        } catch (error: any) {
            setErrorMessage("Erro de rede. Verifique a sua ligação.")
            console.error("Error: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        // Mudamos para grid de 2 colunas a partir de ecrãs médios (md)
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-100 antialiased">
            
            {/* LADO DIREITO: Formulário de Registo */}
            <div className="w-full flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-[420px] bg-white flex flex-col px-10 py-12 rounded-2xl border border-gray-200 shadow-sm">
                    <FlowingCashLogo iconOnly={true} className="justify-center mb-3"/>
                    <h1 className="text-[22px] font-semibold text-gray-700 text-center">Crie a sua conta</h1>
                    <p className="text-sm text-gray-600 text-center mb-6">Junte-se a nós e comece a gerir as suas finanças hoje mesmo.</p>
                    
                    {/* Alertas */}
                    {errorMessage && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-600">
                            <AlertCircle size={18} className="shrink-0" />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle2 size={18} className="shrink-0" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handlerRegisterSubmit} className="flex flex-col gap-4">
                        {/* Input Nome */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">Nome Completo</label>
                            <div className="relative flex items-center">
                                <User className="absolute left-3 text-slate-400" size={18} />
                                <input 
                                    onChange={e => setName(e.target.value)} 
                                    value={name}
                                    type="text" 
                                    placeholder="Seu nome completo" 
                                    required 
                                    className="w-full rounded-xl bg-gray-100 border border-slate-200 pl-10 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-300 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Input Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">Email</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 text-slate-400" size={18} />
                                <input 
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email}
                                    type="email" 
                                    placeholder="seu.email@exemplo.com" 
                                    required 
                                    className="w-full rounded-xl bg-gray-100 border border-slate-200 pl-10 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-300 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">Palavra-passe</label>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-3 text-slate-400" size={18} />
                                <input 
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password}
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Crie uma palavra-passe forte" 
                                    required 
                                    className="w-full rounded-xl bg-gray-100 border border-slate-200 pl-10 pr-10 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-300 focus:bg-white transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full bg-[#431880] hover:bg-[#431880]/90 text-white text-[14px] font-semibold py-2.5 rounded-xl transition-all shadow-md disabled:opacity-60 mt-2"
                        >
                            {loading ? 'A criar conta...' : 'Criar Conta'}
                        </button>
                    </form>

                    <div className="mt-6 text-center pt-4 border-t border-slate-100">
                        <p className="text-sm text-slate-600">
                            Já tem uma conta?{" "}
                            <Link href="/login" className="font-semibold text-[#431880] hover:underline">
                                Iniciar sessão
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            
             {/* PAINEL ESQUERDO: Publicidade / Proposta de Valor (Visível apenas em Desktop) */}
            <div className="w-full hidden md:flex relative w-1/2 min-h-screen p-12 flex-col justify-between overflow-hidden bg-slate-950">
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
                <div className="relative z-50">
                    <Link 
                        href="/landing" 
                        className="inline-flex items-end gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                        Voltar 
                    </Link>
                </div>

                {/* Conteúdo Central: Cópia Publicitária */}
                <div className="relative z-20 max-w-lg mb-12">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
                        FlowingCash Ecosystem
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
                        Tome o controlo do seu <span className="text-purple-400">fluxo financeiro</span>.
                    </h2>
                    <p className="text-base lg:text-lg text-slate-300 font-normal leading-relaxed">
                        Centralize as suas despesas, monitorize economias em tempo real e utilize inteligência artificial para otimizar o seu património a partir de um único painel.
                    </p>
                </div>
            </div>
            
        </div>
    )
}
