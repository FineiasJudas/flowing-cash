import { redirect } from 'next/navigation';

export default function Home() {
	redirect('/landing');
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Home</h1>
    </div>
  );
}
