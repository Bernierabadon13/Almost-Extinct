import { CONSERVATION_STATUSES, HABITATS, COUNTRIES } from '../../data/plants';
import { SlidersHorizontal } from 'lucide-react';

const selectStyle = {
  background: '#3D4A2E',
  border: '1px solid #4A5A38',
  color: '#F5F0E8',
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem',
  fontSize: '0.875rem',
  width: '100%',
};

export default function FilterPanel({ filters, onFilterChange, onSortChange, sort, resultCount }) {
  return (
    <div className="rounded-xl p-4" style={{ background: '#3D4A2E', border: '1px solid #4A5A38' }}>
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={16} style={{ color: '#D2DB76' }} />
        <span className="text-sm font-semibold tracking-wide" style={{ color: '#F5F0E8' }}>
          Filters
        </span>
        {resultCount !== undefined && (
          <span className="ml-auto text-xs" style={{ color: '#8A9A6B' }}>
            {resultCount} {resultCount === 1 ? 'plant' : 'plants'} found
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Conservation Status */}
        <div>
          <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: '#8A9A6B' }}>
            Conservation Status
          </label>
          <select
            value={filters.status}
            onChange={e => onFilterChange('status', e.target.value)}
            style={selectStyle}
          >
            <option value="">All Statuses</option>
            {CONSERVATION_STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: '#8A9A6B' }}>
            Country
          </label>
          <select
            value={filters.country}
            onChange={e => onFilterChange('country', e.target.value)}
            style={selectStyle}
          >
            <option value="">All Countries</option>
            {COUNTRIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Habitat */}
        <div>
          <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: '#8A9A6B' }}>
            Habitat
          </label>
          <select
            value={filters.habitat}
            onChange={e => onFilterChange('habitat', e.target.value)}
            style={selectStyle}
          >
            <option value="">All Habitats</option>
            {HABITATS.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-medium mb-1.5 tracking-wide" style={{ color: '#8A9A6B' }}>
            Sort By
          </label>
          <select
            value={sort}
            onChange={e => onSortChange(e.target.value)}
            style={selectStyle}
          >
            <option value="az">Name A–Z</option>
            <option value="za">Name Z–A</option>
            <option value="population_asc">Lowest Population</option>
            <option value="population_desc">Highest Population</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>

      {/* Active filters clear */}
      {(filters.status || filters.country || filters.habitat) && (
        <button
          onClick={() => {
            onFilterChange('status', '');
            onFilterChange('country', '');
            onFilterChange('habitat', '');
          }}
          className="mt-3 text-xs underline underline-offset-2 transition-colors hover:opacity-80"
          style={{ color: '#D2DB76' }}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
