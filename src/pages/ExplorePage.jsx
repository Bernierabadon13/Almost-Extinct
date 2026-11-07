import { useState, useMemo } from 'react';
import { plants } from '../data/plants';
import PlantCard from '../components/ui/PlantCard';
import SearchBar from '../components/ui/SearchBar';
import FilterPanel from '../components/sections/FilterPanel';
import PlantCounter from '../components/ui/PlantCounter';
import Footer from '../components/layout/Footer';

const APPROVED = plants.filter(p => p.approval_status === 'approved');

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: '', country: '', habitat: '' });
  const [sort, setSort] = useState('az');

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filtered = useMemo(() => {
    let result = APPROVED;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(p =>
        p.common_name.toLowerCase().includes(q) ||
        p.scientific_name.toLowerCase().includes(q)
      );
    }

    // Filters
    if (filters.status) result = result.filter(p => p.conservation_status === filters.status);
    if (filters.country) result = result.filter(p => p.country.toLowerCase().includes(filters.country.toLowerCase()));
    if (filters.habitat) result = result.filter(p => p.habitat === filters.habitat);

    // Sort
    switch (sort) {
      case 'az': return [...result].sort((a, b) => a.common_name.localeCompare(b.common_name));
      case 'za': return [...result].sort((a, b) => b.common_name.localeCompare(a.common_name));
      case 'population_asc': return [...result].sort((a, b) => a.estimated_population - b.estimated_population);
      case 'population_desc': return [...result].sort((a, b) => b.estimated_population - a.estimated_population);
      case 'recent': return [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      default: return result;
    }
  }, [search, filters, sort]);

  return (
    <div className="pb-nav">
      {/* Header */}
      <div
        className="pt-16 pb-12 px-6"
        style={{ background: 'linear-gradient(to bottom, #1A2110, #2D371D)' }}
      >
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#D2DB76' }}>
            Directory
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold mt-2 mb-2"
            style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif' }}
          >
            Plant Archive
          </h1>
          <p className="text-sm mb-8" style={{ color: '#8A9A6B' }}>
            Documenting the world's rarest and most endangered plant species.
          </p>
          <PlantCounter />
        </div>
      </div>

      {/* Search + Filters */}
      <div className="sticky top-0 z-30 px-6 py-4" style={{ background: '#2D371D', borderBottom: '1px solid #3D4A2E' }}>
        <div className="max-w-5xl mx-auto space-y-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by common or scientific name…" />
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            sort={sort}
            onSortChange={setSort}
            resultCount={filtered.length}
          />
        </div>
      </div>

      {/* Plant Grid */}
      <div className="px-6 py-12" style={{ background: '#2D371D' }}>
        <div className="max-w-5xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(plant => <PlantCard key={plant.id} plant={plant} />)}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-5xl mb-6" role="img" aria-label="leaf">🌿</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F5F0E8' }}>
                No plants found
              </h3>
              <p className="text-sm" style={{ color: '#8A9A6B' }}>
                Try adjusting your search or clearing some filters.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
