'use client'

import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export type OverviewChartPoint = {
  month: string;
  receitas: number;
  despesas: number;
};

interface OverviewChartProps {
  data: OverviewChartPoint[];
}

export default function OverviewChart({ data }: OverviewChartProps) {
  return (
    <div className="w-full h-[320px] bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Fluxo de Caixa</h3>
          <p className="text-xs text-gray-500">Comparativo mensal entre entradas e saídas</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Receitas
          </span>
          <span className="flex items-center gap-1.5 text-purple-700">
            <span className="w-2.5 h-2.5 rounded-full bg-[#431880]" /> Despesas
          </span>
        </div>
      </div>

      <div className="w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#431880" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#431880" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val / 1000}k`} />
            <Tooltip 
              formatter={(value: any) => [`${Number(value).toLocaleString('pt-AO')} Kz`, '']}
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="receitas" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReceitas)" animationDuration={900} animationEasing="ease-out" />
            <Area type="monotone" dataKey="despesas" stroke="#431880" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDespesas)" animationDuration={900} animationBegin={150} animationEasing="ease-out" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
