import { useState, useEffect } from 'preact/hooks';
import type { Player } from '../types/player.ts';

export default function PlayerSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [_isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const searchPlayers = async () => {
      if (!searchQuery.trim()) {
        setPlayers([]);
        return;
      }

      try {
        const response = await fetch(`/api/players/search?q=${encodeURIComponent(searchQuery)}`);
        
        if (!response.ok) throw new Error('Error en la búsqueda');
        
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        console.error(err);
      }
    };

    const timeoutId = setTimeout(searchPlayers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e: Event) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-6xl px-4" style={{ marginTop: '4rem' }}>
      <form onSubmit={handleSearch} className="relative mb-8" style={{ minWidth: '300px' }}>
        <input
          type="text"
          value={searchQuery}
          onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Buscar jugador..."
          style={{ 
            minWidth: '300px',
            width: '100%',
            padding: 'calc(0.25rem * 3) calc(0.25rem * 6)',
            fontSize: '1.25rem',
            border: '1px solid #ebebeb',
            borderRadius: '9999px',
            backgroundColor: '#fff',
            color: '#202124',
            outline: 'none',
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#a3a8ad';
            e.currentTarget.style.borderColor = '#a3a8ad';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.borderColor = '#ebebeb';
          }}
        />
      </form>

      {players.length > 0 && (
        <div className="space-y-3">
          {players.map((player) => (
            <a
              key={player.id}
              href={`/players/${player.id}`}
              style={{ 
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                padding: 'calc(0.25rem * 3) calc(0.25rem * 6)',
                border: '1px solid #ebebeb',
                borderRadius: '9999px',
                backgroundColor: '#fff',
                transition: 'all 0.2s ease-in-out',
                marginBottom: '0.75rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#a3a8ad';
                e.currentTarget.style.borderColor = '#a3a8ad';
                e.currentTarget.style.color = '#010101';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.borderColor = '#ebebeb';
                e.currentTarget.style.color = 'inherit';
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {player.ioc2 && (
                    <span className={`fi fi-${player.ioc2.toLowerCase()} text-2xl`}></span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">
                    {player.name_full}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
