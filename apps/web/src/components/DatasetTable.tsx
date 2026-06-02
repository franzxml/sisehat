import type { ItemDataset } from '../types/optimasi'

interface Props {
  data: ItemDataset[]
}

const WARNA_WAKTU: Record<string, string> = {
  'Sarapan':     'bg-yellow-100 text-yellow-700',
  'Makan Siang': 'bg-blue-100 text-blue-700',
  'Makan Malam': 'bg-purple-100 text-purple-700',
}

export default function DatasetTable({ data }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 w-10">ID</th>
              <th className="px-4 py-3">Nama Makanan</th>
              <th className="px-4 py-3">Waktu</th>
              <th className="px-4 py-3 text-right">Kalori</th>
              <th className="px-4 py-3 text-right">Protein</th>
              <th className="px-4 py-3 text-right">Lemak</th>
              <th className="px-4 py-3 text-right">Karbo</th>
              <th className="px-4 py-3 text-right">Harga</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-gray-400 font-mono text-xs">{item.id}</td>
                <td className="px-4 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{item.nama}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${WARNA_WAKTU[item.waktu_makan]}`}>
                    {item.waktu_makan}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right text-gray-600 whitespace-nowrap">{item.kalori} kkal</td>
                <td className="px-4 py-2.5 text-right text-gray-600 whitespace-nowrap">{item.protein} g</td>
                <td className="px-4 py-2.5 text-right text-gray-600 whitespace-nowrap">{item.lemak} g</td>
                <td className="px-4 py-2.5 text-right text-gray-600 whitespace-nowrap">{item.karbo} g</td>
                <td className="px-4 py-2.5 text-right text-gray-600 whitespace-nowrap">Rp{item.harga.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
