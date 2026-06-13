import type { ParameterGA } from '../types/optimasi'

interface Props {
  label: string
  name: keyof ParameterGA
  value: number
  min: number
  max: number
  step: number
  defaultValue: number
  onChange: (name: keyof ParameterGA, value: number) => void
}

export default function ParameterField({ label, name, value, min, max, step, defaultValue, onChange }: Props) {
  const isDefault = value === defaultValue
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-600">{label}</label>
        {!isDefault && (
          <span className="text-xs text-green-600 font-medium">diubah</span>
        )}
      </div>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(name, Number(e.target.value))}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
      />
      <span className="text-xs text-gray-400">default: {defaultValue}</span>
    </div>
  )
}
