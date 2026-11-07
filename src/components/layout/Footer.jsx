export default function Footer() {
  return (
    <footer style={{ background: '#1A2110', borderTop: '1px solid #3D4A2E' }} className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: '#D2DB76' }} className="text-lg font-bold tracking-widest">ALMOST EXTINCT</span>
            </div>
            <p style={{ color: '#8A9A6B' }} className="text-sm leading-relaxed">
              A botanical conservation directory dedicated to documenting rare, exotic, endangered, and critically endangered plant species around the world.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#D2DB76' }} className="text-xs font-semibold tracking-widest uppercase mb-4">Navigate</h4>
            <ul style={{ color: '#8A9A6B' }} className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#D2DB76] transition-colors">Home</a></li>
              <li><a href="/explore" className="hover:text-[#D2DB76] transition-colors">Explore Plants</a></li>
              <li><a href="/contribute" className="hover:text-[#D2DB76] transition-colors">Contribute</a></li>
              <li><a href="/about" className="hover:text-[#D2DB76] transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#D2DB76' }} className="text-xs font-semibold tracking-widest uppercase mb-4">Conservation</h4>
            <ul style={{ color: '#8A9A6B' }} className="space-y-2 text-sm">
              <li><a href="https://www.iucnredlist.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D2DB76] transition-colors">IUCN Red List</a></li>
              <li><a href="https://www.bgci.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D2DB76] transition-colors">Botanic Gardens Conservation</a></li>
              <li><a href="https://www.kew.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D2DB76] transition-colors">Royal Botanic Gardens, Kew</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #3D4A2E' }} className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ color: '#6B7355' }} className="text-xs">
            © 2024 Almost Extinct. A botanical conservation archive. All data is for educational demonstration purposes.
          </p>
          <p style={{ color: '#6B7355' }} className="text-xs">
            Population figures should be verified against official sources such as the IUCN Red List.
          </p>
        </div>
      </div>
    </footer>
  );
}
