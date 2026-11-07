import { useNavigate } from 'react-router-dom';
import ConservationStatusBadge from './ConservationStatusBadge';
import PopulationBadge from './PopulationBadge';
import { MapPin } from 'lucide-react';

export default function PlantCard({ plant }) {
  const navigate = useNavigate();

  return (
    <article
      className="rounded-xl overflow-hidden flex flex-col cursor-pointer group transition-all duration-300 hover:-translate-y-1"
      style={{
        background: '#3D4A2E',
        border: '1px solid #4A5A38',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onClick={() => navigate(`/plant/${plant.id}`)}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/plant/${plant.id}`)}
      aria-label={`View ${plant.common_name}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={plant.image}
          alt={plant.common_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={e => {
            e.target.src = `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80`;
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(29,38,16,0.7) 0%, transparent 60%)' }}
        />
        {/* Status badge over image */}
        <div className="absolute top-3 left-3">
          <ConservationStatusBadge status={plant.conservation_status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-semibold text-base leading-snug" style={{ color: '#F5F0E8' }}>
            {plant.common_name}
          </h3>
          <p className="text-xs italic mt-0.5" style={{ color: '#8A9A6B' }}>
            {plant.scientific_name}
          </p>
        </div>

        <PopulationBadge population={plant.estimated_population} />

        <div className="flex items-center gap-1.5" style={{ color: '#8A9A6B' }}>
          <MapPin size={12} />
          <span className="text-xs line-clamp-1">{plant.country}</span>
        </div>

        <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: '#A8B885' }}>
          {plant.short_description}
        </p>

        <button
          onClick={e => { e.stopPropagation(); navigate(`/plant/${plant.id}`); }}
          className="mt-auto w-full py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:opacity-90"
          style={{ background: '#D2DB76', color: '#2D371D' }}
        >
          View Details
        </button>
      </div>
    </article>
  );
}
