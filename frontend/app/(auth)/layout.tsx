export default function AuthLayout({children} : Readonly<{children: React.ReactNode}>) {
    return (
        <main className="w-full min-h-screen flex flex-col bg-gray-100">
            {children}
        </main>
    )
}