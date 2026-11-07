import { useParams, useNavigate } from 'react-router-dom';
import { plants } from '../data/plants';
import ConservationStatusBadge from '../components/ui/ConservationStatusBadge';
import PopulationBadge from '../components/ui/PopulationBadge';
import Footer from '../components/layout/Footer';
import { ArrowLeft, MapPin, Calendar, ExternalLink, AlertTriangle, Shield, Lightbulb } from 'lucide-react';

export default function PlantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = plants.find(p => p.id === parseInt(id));

  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pb-nav" style={{ background: '#2D371D' }}>
        <p className="text-xl mb-6" style={{ color: '#F5F0E8' }}>Plant not found.</p>
        <button onClick={() => navigate('/explore')} className="text-sm" style={{ color: '#D2DB76' }}>
          Back to Archive
        </button>
      </div>
    );
  }

  return (
    <div className="pb-nav">
      {/* Back button */}
      <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(29,38,16,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #3D4A2E' }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: '#D2DB76' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative overflow-hidden" style={{ height: '55vh', maxHeight: '500px' }}>
        <img
          src={plant.image}
          alt={plant.common_name}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80'; }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(29,38,16,0.95) 0%, rgba(29,38,16,0.3) 60%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <ConservationStatusBadge status={plant.conservation_status} showLabel />
              <PopulationBadge population={plant.estimated_population} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif' }}>
              {plant.common_name}
            </h1>
            <p className="text-lg italic mt-2" style={{ color: '#A8B885' }}>{plant.scientific_name}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-12" style={{ background: '#2D371D' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <section>
                <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#D2DB76' }}>About this Plant</h2>
                <p className="text-base leading-relaxed" style={{ color: '#A8B885' }}>{plant.full_description}</p>
              </section>

              {/* Threats */}
              {plant.threats?.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={16} style={{ color: '#D2DB76' }} />
                    <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#D2DB76' }}>Threats</h2>
                  </div>
                  <ul className="space-y-2">
                    {plant.threats.map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#D2DB76' }} />
                        <span className="text-sm" style={{ color: '#A8B885' }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Conservation Efforts */}
              {plant.conservation_efforts?.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield size={16} style={{ color: '#D2DB76' }} />
                    <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#D2DB76' }}>Conservation Efforts</h2>
                  </div>
                  <ul className="space-y-2">
                    {plant.conservation_efforts.map((e, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#8A9A6B' }} />
                        <span className="text-sm" style={{ color: '#A8B885' }}>{e}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Interesting Facts */}
              {plant.interesting_facts?.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={16} style={{ color: '#D2DB76' }} />
                    <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#D2DB76' }}>Interesting Facts</h2>
                  </div>
                  <div className="space-y-3">
                    {plant.interesting_facts.map((fact, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: '#3D4A2E', border: '1px solid #4A5A38' }}>
                        <span className="text-xs font-bold w-5 h-5 flex items-center justify-center rounded flex-shrink-0 mt-0.5" style={{ background: 'rgba(210,219,118,0.15)', color: '#D2DB76' }}>{i + 1}</span>
                        <span className="text-sm" style={{ color: '#A8B885' }}>{fact}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick facts */}
              <div className="rounded-xl p-5" style={{ background: '#3D4A2E', border: '1px solid #4A5A38' }}>
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: '#D2DB76' }}>Quick Facts</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs mb-1" style={{ color: '#6B7355' }}>Estimated Population</div>
                    <PopulationBadge population={plant.estimated_population} size="md" />
                  </div>
                  <div>
                    <div className="text-xs mb-1" style={{ color: '#6B7355' }}>Conservation Status</div>
                    <ConservationStatusBadge status={plant.conservation_status} showLabel size="md" />
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#8A9A6B' }} />
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: '#6B7355' }}>Location</div>
                      <div className="text-sm" style={{ color: '#F5F0E8' }}>{plant.country}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs mb-1" style={{ color: '#6B7355' }}>Natural Habitat</div>
                    <div className="text-sm" style={{ color: '#F5F0E8' }}>{plant.habitat}</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#8A9A6B' }} />
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: '#6B7355' }}>Date Added</div>
                      <div className="text-sm" style={{ color: '#F5F0E8' }}>{new Date(plant.created_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: '#6B7355' }}>Last Verified</div>
                    <div className="text-sm" style={{ color: '#F5F0E8' }}>{new Date(plant.last_verified_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                </div>
              </div>

              {/* Reference */}
              {plant.reference_url && (
                <a
                  href={plant.reference_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full p-4 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80"
                  style={{ background: 'rgba(210,219,118,0.1)', border: '1px solid rgba(210,219,118,0.25)', color: '#D2DB76' }}
                >
                  <ExternalLink size={14} />
                  View External Reference
                </a>
              )}

              {/* Disclaimer */}
              <p className="text-xs leading-relaxed" style={{ color: '#6B7355' }}>
                Population figures and conservation status are for demonstration purposes. Verify with IUCN Red List and primary sources for current data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
