import LandingNavBar from "@/components/LandingNavBar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <LandingNavBar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}