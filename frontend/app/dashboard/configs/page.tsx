'use client'

import { useEffect, useState } from 'react';
import { apiFetch } from '@/services/api';
import { User as UserIcon, Mail, Calendar, Loader2 } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function ConfigsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { user } = await apiFetch<{ user: User }>('/auth/me');
        setUser(user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar perfil.');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-24 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        A carregar definições...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Definições</h2>
        <p className="text-xs text-gray-500">Detalhes da tua conta FlowingCash</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4">{error}</div>
      )}

      {user && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#431880] text-white flex items-center justify-center font-bold text-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3 text-gray-600">
              <UserIcon className="w-4 h-4 text-gray-400" />
              <span>{user.name}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Membro desde {new Date(user.createdAt).toLocaleDateString('pt-AO')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
