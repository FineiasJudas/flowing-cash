import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Extrai o token dos cookies da requisição
  const token = request.cookies.get('token')?.value

  // 2. Verifica se o utilizador está a tentar aceder a uma rota protegida (ex: /dashboard)
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
  
  // 3. Verifica se o utilizador está nas páginas de autenticação (login/register)
  const isAuthRoute = ['/login', '/register'].includes(request.nextUrl.pathname)

  // Cenário A: Tenta aceder ao painel sem estar autenticado -> Redireciona para o Login
  if (isDashboardRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    // Opcional: Guarda a página que ele tentou aceder para redirecionar depois
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Cenário B: Já está autenticado mas tenta ir para o Login/Registo -> Redireciona para o Dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Permite que a requisição continue normalmente se não encaixar nos bloqueios
  return NextResponse.next()
}

// Configuração do Matcher: Define exatamente quais rotas acionam este middleware
export const config = {
  matcher: [
    '/dashboard/:path*', // Protege /dashboard e qualquer subrota (ex: /dashboard/transactions)
    '/login',
    '/register'
  ]
}
