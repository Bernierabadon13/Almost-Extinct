import { plants, MAX_CAPACITY } from '../../data/plants';

const APPROVED = plants.filter(p => p.approval_status === 'approved').length;

export default function PlantCounter({ large = false }) {
  const pct = Math.round((APPROVED / MAX_CAPACITY) * 100);
  const remaining = MAX_CAPACITY - APPROVED;

  return (
    <div className={large ? 'text-center' : ''}>
      <div className={`font-mono font-bold tracking-widest ${large ? 'text-3xl md:text-4xl' : 'text-xl'}`}
        style={{ color: '#D2DB76' }}>
        {APPROVED} / {MAX_CAPACITY}
      </div>
      <div className={`font-semibold tracking-widest uppercase mt-1 ${large ? 'text-sm' : 'text-xs'}`}
        style={{ color: '#8A9A6B' }}>
        Plants Documented
      </div>
      {large && (
        <div className="mt-4 max-w-xs mx-auto">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#3D4A2E' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: '#D2DB76' }}
            />
          </div>
          <div className="mt-2 text-xs flex justify-between" style={{ color: '#6B7355' }}>
            <span>0</span>
            <span>{remaining > 0 ? `${remaining} slots remaining` : 'Collection full'}</span>
            <span>{MAX_CAPACITY}</span>
          </div>
        </div>
      )}
    </div>
  );
}
