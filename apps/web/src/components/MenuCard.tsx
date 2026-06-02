import type { ItemMenu } from '../types/optimasi'

interface Props {
  label: string
  menu: ItemMenu
}

export default function MenuCard({ label, menu }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 flex flex-col gap-2 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-widest text-green-600">{label}</span>
      <h3 className="text-base font-bold text-gray-900 leading-snug">{menu.nama}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-400 mt-1">
        <span>Kalori</span>      <span className="font-semibold text-gray-700">{menu.kalori} kkal</span>
        <span>Protein</span>     <span className="font-semibold text-gray-700">{menu.protein} g</span>
        <span>Lemak</span>       <span className="font-semibold text-gray-700">{menu.lemak} g</span>
        <span>Karbohidrat</span> <span className="font-semibold text-gray-700">{menu.karbo} g</span>
        <span>Harga</span>       <span className="font-semibold text-gray-700">Rp{menu.harga.toLocaleString('id-ID')}</span>
      </div>
    </div>
  )
}
