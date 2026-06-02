import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

interface Props {
  data: Array<{
    generasi: number
    terbaik: number
    rata_rata: number
    terburuk: number
  }>
}

export default function KonvergensiChart({ data }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
      <h2 className="font-bold text-gray-800 text-lg mb-4">Grafik Konvergensi</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="generasi"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            label={{ value: 'Generasi', position: 'insideBottomRight', offset: -4, fontSize: 11, fill: '#9ca3af' }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            label={{ value: 'Fitness', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#111827' }}
            labelFormatter={(v) => `Generasi ${v}`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="terbaik"   name="Terbaik"   stroke="#16a34a" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="rata_rata" name="Rata-rata" stroke="#3b82f6" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
          <Line type="monotone" dataKey="terburuk"  name="Terburuk"  stroke="#ef4444" strokeWidth={1} dot={false} strokeDasharray="2 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
