interface Props {
  label: string
  nilai: number
  satuan: string
  status: string
  batas: string
}

export default function ConstraintBadge({ label, nilai, satuan, status, batas }: Props) {
  const terpenuhi = status === 'TERPENUHI'
  return (
    <div className={`rounded-2xl border p-4 flex flex-col gap-1 shadow-sm ${terpenuhi ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <span className="text-xl font-bold text-gray-900">{nilai} <span className="text-sm font-normal text-gray-400">{satuan}</span></span>
      <span className={`text-xs font-bold ${terpenuhi ? 'text-green-600' : 'text-red-500'}`}>{status}</span>
      <span className="text-xs text-gray-400">{batas}</span>
    </div>
  )
}
