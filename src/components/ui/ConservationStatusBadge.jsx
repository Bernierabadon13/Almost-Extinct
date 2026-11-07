import { getConservationStatusInfo } from '../../data/plants';

export default function ConservationStatusBadge({ status, showLabel = false, size = 'sm' }) {
  const info = getConservationStatusInfo(status);
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm font-semibold tracking-wider border ${info.bg} ${info.color} ${info.border} ${sizeClasses}`}
      title={info.label}
    >
      <span className="font-bold">{info.short}</span>
      {showLabel && <span className="font-normal opacity-80">{info.label}</span>}
    </span>
  );
}
