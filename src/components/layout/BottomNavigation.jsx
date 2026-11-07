import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, PlusCircle, Info } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/explore', label: 'Explore', icon: Compass },
  { path: '/contribute', label: 'Contribute', icon: PlusCircle },
  { path: '/about', label: 'About', icon: Info },
];

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav
      style={{ background: 'rgba(29,38,16,0.97)', backdropFilter: 'blur(12px)' }}
      className="fixed bottom-0 left-0 right-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-lg mx-auto px-4 flex items-center justify-around"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 pt-3 pb-1 px-4 transition-all duration-200 group"
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.2 : 1.6}
                style={{ color: isActive ? '#D2DB76' : '#8A9A6B' }}
                className="transition-colors duration-200"
              />
              <span
                className="text-xs font-medium tracking-wide transition-colors duration-200"
                style={{ color: isActive ? '#D2DB76' : '#8A9A6B', fontSize: '0.68rem' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
