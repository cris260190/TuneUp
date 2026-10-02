import { useLanguage } from '../hooks/useLanguage'

export default function PalmGuide() {
  const { t } = useLanguage()
  const label = [1, 2, 3, 4]
    .map(n => `${n} ${t?.[`finger${n}`] || ''}`.trim())
    .filter(part => part.length > 2)
    .join(', ')

  return (
    <img
      src="/images/palm-guitar-strings.png"
      alt={label || '1 Index, 2 Middle, 3 Ring, 4 Pinky'}
      style={{
        display: 'block',
        width: 'min(260px, 78%)',
        height: 'auto',
        margin: '0 auto',
      }}
    />
  )
}
