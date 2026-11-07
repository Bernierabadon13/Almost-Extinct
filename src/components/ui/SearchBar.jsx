import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search plants…' }) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: '#8A9A6B' }}
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2.5 rounded-lg text-sm transition-all duration-200"
        style={{
          background: '#3D4A2E',
          border: '1px solid #4A5A38',
          color: '#F5F0E8',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: '#8A9A6B' }}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
