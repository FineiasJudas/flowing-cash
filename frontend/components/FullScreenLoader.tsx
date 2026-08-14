export default function FullScreenLoader({ label }: { label?: string }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-[#431880]/20 border-t-[#431880] rounded-full animate-spin" />
      <p className="text-gray-500 font-medium text-sm">{label || 'A carregar...'}</p>
    </div>
  );
}
